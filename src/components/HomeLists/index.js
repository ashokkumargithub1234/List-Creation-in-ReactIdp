import { Component } from "react";
// import Loader from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./index.css";

import Header from "../Header";
import ListContainer from "../ListContainer";
import FailureContainer from "../FailureContainer";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class HomeLists extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    listsData: [],
    duplicatesData: [],
    selectedLists: [],
    isUpdating: false,
    alertIn: false,
  };

  componentDidMount() {
    this.getListData();
  }

  getFilterListData = (listData) => {
    const filteredList1 = listData.filter(
      (eachList) => eachList.list_number === 1
    );
    filteredList1.unshift({ listId: "List1", list_number: 1 });

    const filteredList2 = listData.filter(
      (eachList) => eachList.list_number === 2
    );
    filteredList2.unshift({ listId: "List2", list_number: 2 });
    return [filteredList1, filteredList2];
  };

  getListData = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    const listUrl = "https://apis.ccbp.in/list-creation/lists";
    const response = await fetch(listUrl);
    if (response.ok === true) {
      const listData = await response.json();
      // console.log(listData.lists)
      const filteredLists = this.getFilterListData(listData.lists);
      this.setState({
        listsData: filteredLists,
        duplicatesData: filteredLists,
        apiStatus: apiStatusConstants.success,
      });
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      });
    }
  };

  renderSpinnerLoader = () => (
    <div className="loader-container" data-testid="loader">
      <h1 color="#3b82f6" height={50} width={50}>
        Fetching Lists...
      </h1>
    </div>
  );

  tryAgain = () => {
    this.getListData();
  };

  cancelButton = () => {
    const { duplicatesData } = this.state;
    this.setState({
      listsData: duplicatesData,
      isUpdating: false,
      selectedLists: [],
    });
  };

  updateButton = () => {
    const { listsData } = this.state;
    const sortedData = listsData.sort(
      (a, b) => a[0].list_number - b[0].list_number
    );
    // console.log(sortedData)
    this.setState({
      duplicatesData: sortedData,
      listsData: sortedData,
      selectedLists: [],
      isUpdating: false,
    });
  };

  onCreateList = () => {
    const { listsData, selectedLists } = this.state;
    const newList = [
      {
        listId: `List${listsData.length + 1}`,
        list_number: listsData.length + 1,
      },
    ];

    if (selectedLists.length !== 2) {
      this.setState({ alertIn: true });
    } else {
      const modifiyLists = listsData.filter((eachList) =>
        selectedLists.includes(eachList[0].listId)
      );
      modifiyLists.splice(1, 0, newList);
      // console.log(modifiyLists)
      const allLists = listsData
        .filter((eachList) => !selectedLists.includes(eachList[0].listId))
        .concat(modifiyLists);
      // console.log(allLists)

      selectedLists.splice(1, 0, `List${listsData.length + 1}`);
      this.setState({
        isUpdating: true,
        alertIn: false,
        listsData: allLists,
        selectedLists,
      });
    }
  };

  selectList = (listNumber) => {
    const { selectedLists } = this.state;

    if (selectedLists.includes(listNumber)) {
      this.setState({
        selectedLists: [
          ...selectedLists.filter((eachNumber) => eachNumber !== listNumber),
        ],
      });
    } else {
      this.setState({ selectedLists: [...selectedLists, listNumber] });
    }
  };

  giveObjectToNewList = (id, listNumber, objectDetails) => {
    const { listsData, selectedLists } = this.state;

    this.setState({
      listsData: [
        ...listsData.map((eachList) => {
          if (eachList[0].list_number === listNumber) {
            const changeListItems = eachList.filter(
              (eachItem) => eachItem.id !== id
            );
            return changeListItems;
          }

          if (eachList[0].listId === selectedLists[1]) {
            return [
              ...eachList,
              { ...objectDetails, list_number: eachList[0].list_number },
            ];
          }

          return eachList;
        }),
      ],
    });
  };

  objectGiveToPreviousLists = (id, listNumber, objectDetails, selectedList) => {
    const { listsData } = this.state;
    this.setState({
      listsData: [
        ...listsData.map((eachList) => {
          if (eachList[0].list_number === listNumber) {
            const changeListItems = eachList.filter(
              (eachItem) => eachItem.id !== id
            );
            return changeListItems;
          }

          if (eachList[0].listId === selectedList) {
            return [
              ...eachList,
              { ...objectDetails, list_number: eachList[0].list_number },
            ];
          }

          return eachList;
        }),
      ],
    });
  };

  renderHomeLists = () => {
    const { listsData, selectedLists, isUpdating, alertIn } = this.state;
    console.log(listsData);
    console.log(selectedLists);
    return (
      <>
        <Header
          updateState={isUpdating}
          alertState={alertIn}
          onCreateList={this.onCreateList}
        />
        <div className="lists-container">
          {listsData.map((eachList) => (
            <ListContainer
              key={eachList[0].listId}
              selectedLists={selectedLists}
              isUpdating={isUpdating}
              listsData={listsData}
              eachList={eachList}
              selectList={this.selectList}
              giveObjectToNewList={this.giveObjectToNewList}
              objectGiveToPreviousLists={this.objectGiveToPreviousLists}
            />
          ))}
        </div>
        {isUpdating ? (
          <div className="button-container">
            <button
              type="button"
              className="button cancel"
              onClick={this.cancelButton}
            >
              Cancel
            </button>
            <button
              type="button"
              className="button update"
              onClick={this.updateButton}
            >
              Update
            </button>
          </div>
        ) : (
          ""
        )}
      </>
    );
  };

  renderRepositories = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHomeLists();
      case apiStatusConstants.failure:
        return <FailureContainer tryAgain={this.tryAgain} />;
      case apiStatusConstants.inProgress:
        return this.renderSpinnerLoader();
      default:
        return null;
    }
  };

  render() {
    return <div className="app-container">{this.renderRepositories()}</div>;
  }
}
export default HomeLists;

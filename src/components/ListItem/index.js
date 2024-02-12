import "./index.css";

const ListItem = (props) => {
  const {
    objectDetails,
    selectedLists,
    updateState,
    giveObjectToNewList,
    objectGiveToPreviousLists,
  } = props;
  const { name, description, id } = objectDetails;

  const activeList = `List${objectDetails.list_number}`;

  const isActiveList = selectedLists.includes(activeList);
  const newListActive = selectedLists[1] === activeList;
  let arrowUrl;
  let altText;

  const giveObjectToNew = () => {
    giveObjectToNewList(id, objectDetails.list_number, objectDetails);
  };

  const giveObjectToNext = () => {
    objectGiveToPreviousLists(
      id,
      objectDetails.list_number,
      objectDetails,
      selectedLists[2]
    );
  };
  const giveObjectToPrevious = () => {
    objectGiveToPreviousLists(
      id,
      objectDetails.list_number,
      objectDetails,
      selectedLists[0]
    );
  };

  if (selectedLists[0] === `List${objectDetails.list_number}`) {
    arrowUrl =
      "https://assets.ccbp.in/frontend/react-js/list-creation/list-creation-right-arrow.png";
    altText = "right arrow";
  } else if (selectedLists[2] === `List${objectDetails.list_number}`) {
    arrowUrl =
      "https://assets.ccbp.in/frontend/react-js/list-creation/list-creation-left-arrow.png";
    altText = "left arrow";
  }

  return (
    <li className="list-item">
      <h1 className="heading">{name}</h1>
      <p className="description">{description}</p>
      {updateState && newListActive && (
        <div className="arrow-button-container">
          <button
            type="button"
            onClick={giveObjectToPrevious}
            className="arrow-button"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/list-creation/list-creation-left-arrow.png"
              alt="left arrow"
              className="arrow-img"
            />
          </button>

          <button
            type="button"
            onClick={giveObjectToNext}
            className="arrow-button"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/list-creation/list-creation-right-arrow.png"
              alt="right arrow"
              className="arrow-img"
            />
          </button>
        </div>
      )}
      {updateState && !newListActive && isActiveList && (
        <button
          type="button"
          onClick={giveObjectToNew}
          className="arrow-button"
        >
          <img src={arrowUrl} alt={altText} className="arrow-img" />
        </button>
      )}
    </li>
  );
};
export default ListItem;

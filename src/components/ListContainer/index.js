import "./index.css";

import ListItem from "../ListItem";

const ListContainer = (props) => {
  const {
    selectedLists,
    isUpdating,
    eachList,
    selectList,
    giveObjectToNewList,
    objectGiveToPreviousLists,
  } = props;

  const listValue = eachList[0].listId;
  // console.log(listValue)
  const selectListId = () => {
    selectList(listValue);
  };
  let checkedState;
  const checkCheckedState = (event) => {
    checkedState = selectedLists.includes(event.target.value);
  };

  return (
    <>
      <div className="lists-view">
        <div
          className="checkbox-container"
          data-testid={`list${listValue}`}
          onChange={selectListId}
        >
          {isUpdating ? (
            ""
          ) : (
            <input
              type="checkbox"
              id={listValue}
              checked={checkedState}
              onChange={checkCheckedState}
              className="input-checkbox"
              value={listValue}
            />
          )}

          <label htmlFor={listValue} className="input-label">
            {listValue} ({eachList.length - 1})
          </label>
        </div>
        <ul className="lists-items">
          {eachList.slice(1).map((eachObject) => (
            <ListItem
              objectDetails={eachObject}
              key={eachObject.id}
              updateState={isUpdating}
              selectedLists={selectedLists}
              giveObjectToNewList={giveObjectToNewList}
              objectGiveToPreviousLists={objectGiveToPreviousLists}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
export default ListContainer;

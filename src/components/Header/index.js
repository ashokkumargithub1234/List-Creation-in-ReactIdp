import "./index.css";

const Header = (props) => {
  const { updateState, alertState, onCreateList } = props;
  const createNewList = () => {
    onCreateList();
  };
  return (
    <div className="title-container">
      <h1 className="title">List Creation</h1>
      <button
        type="button"
        className="list-button"
        onClick={createNewList}
        disabled={updateState}
      >
        Create a new List
      </button>
      {alertState && (
        <p className="alert-title">
          *You should select exactly 2 lists to create new list
        </p>
      )}
    </div>
  );
};

export default Header;

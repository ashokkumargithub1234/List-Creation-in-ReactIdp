import "./index.css";

const FailureContainer = (props) => {
  const { tryAgain } = props;
  const tryAgainLists = () => {
    tryAgain();
  };
  return (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/list-creation/list-creation-failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <button type="button" className="button update" onClick={tryAgainLists}>
        Try Again
      </button>
    </div>
  );
};
export default FailureContainer;

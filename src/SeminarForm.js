import React from "react";
const SeminarForm = () => {
  const [answer, setAnswer] = React.useState();

  const handleSubmit = (e) => {
    setAnswer(e.target.value);
    console.log(e.target.value);
    console.log(answer);
  };
  return (
    <div style={{ color: "blue" }}>
      <form>
        Do you want to take a seminar?
        <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value="option1"
              className="form-check-input"
              onChange={() => {
                setAnswer("Yes");
              }}
              checked={answer === "Yes"}
            />
            Yes
          </label>
        </div>
        <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value="option2"
              className="form-check-input"
              onChange={() => {
                setAnswer("No");
              }}
              checked={answer === "No"}
            />
            No
          </label>
        </div>
        <div className="form-group">
          <button className="button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SeminarForm;

import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.div`
  color: red;
`;
const SubmitButton = styled.button`
  color: blue;
`;

const SeminarForm = () => {
  const [answer, setAnswer] = useState("None");

  const handleSubmit = (e) => {
    setAnswer(e.target.value);
    console.log(e.target.value);
    console.log(answer);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        Do you want to take a seminar?
        <div className="form-check">
          <label>
            <input
              type="radio"
              value="Yes"
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
              value="Yes"
              className="form-check-input"
              onChange={() => {
                setAnswer("No");
              }}
              checked={answer === "No"}
            />
            No
          </label>
        </div>
        <SubmitButton>Submit</SubmitButton>
      </Form>
    </div>
  );
};

export default SeminarForm;

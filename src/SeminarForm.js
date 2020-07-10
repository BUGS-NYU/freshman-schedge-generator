import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  color: red;
`;
const SubmitButton = styled.button`
  color: blue;
`;

async function getSeminars() {
  try {
    const data = await fetch("https://schedge.a1liu.com/2020/FA/UA/FYSEM");
    // awaits for the promise to return the data
    const courses = await data.json();

    const allSubjects = [];
    allSubjects.push(courses);

    return allSubjects;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

function getRandomSection(allSubjects) {
  let randomClass = getRandomIndex(allSubjects[0].length);
  let randomSection = allSubjects[0][randomClass];

  console.log("randomSection " + randomSection.name + " " + randomSection.deptCourseId);
}

function getRandomIndex(size) {
  return Math.floor(Math.random() * size);
}

const SeminarForm = () => {
  const [answer, setAnswer] = useState("None");
  const [seminars, setSeminars] = useState([]);
  const [mySeminar, setMySeminar] = useState([]);

  async function generateSeminar() {
    if (seminars.length === 0) {
      const randomArray = await getSeminars();

      setSeminars(randomArray);
      setMySeminar(getRandomSection(randomArray));
    } else {
      setMySeminar(getRandomSection(seminars));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnswer(e.target.value);
    console.log(e.target.value);
    console.log(answer);
    if (answer === "Yes") {
      generateSeminar();
      console.log("Answer is yes!");
    }
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

import React, { useState } from "react";
import Button from "./Button";
import styled from "styled-components";
import Table from "./Table";

const StyledSchedule = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

async function getRandomSeminars() {
  try {
    const data = await fetch("https://schedge.a1liu.com/2020/FA/UA/FYSEM");
    // awaits for the promise to return the data
    const courses = await data.json();

    for (let i = 0; i < courses.length; i++) {
      const id = parseInt(courses[i].deptCourseId);
      courses[i].sectionID = id;
    }

    const allSubjects = [];
    allSubjects.push(courses);

    return allSubjects;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

async function getRandomCourses() {
  try {
    const data = await fetch("https://schedge.a1liu.com/2020/FA/UA/CORE");
    // awaits for the promise to return the data
    const courses = await data.json();

    let physicalScience = [];
    let lifeScience = [];
    let textsAndIdeas = [];
    let culturesAndContexts = [];
    let expressiveCulture = [];
    let quantitativeReasoning = [];

    let i = 0;

    for (i = 0; i < courses.length; i++) {
      const id = parseInt(courses[i].deptCourseId);

      let j = 0;
      for (j = 0; j < courses[i].sections.length; j++) {
        courses[i].sections[j].sectionID = id;
      }
      j = 0;

      if (id < 300 && id >= 200) {
        physicalScience = physicalScience.concat(courses[i].sections);
      } else if (id < 400 && id >= 300) {
        lifeScience = lifeScience.concat(courses[i].sections);
      } else if (id >= 400 && id < 500) {
        textsAndIdeas = textsAndIdeas.concat(courses[i].sections);
      } else if (id >= 500 && id < 600) {
        culturesAndContexts = culturesAndContexts.concat(courses[i].sections);
      } else if (id >= 700) {
        expressiveCulture = expressiveCulture.concat(courses[i].sections);
      } else {
        quantitativeReasoning = quantitativeReasoning.concat(
          courses[i].sections
        );
      }
    }

    const allSubjects = [];
    allSubjects.push(physicalScience);
    allSubjects.push(lifeScience);
    allSubjects.push(textsAndIdeas);
    allSubjects.push(culturesAndContexts);
    allSubjects.push(expressiveCulture);
    allSubjects.push(quantitativeReasoning);

    return allSubjects;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

function getRandomSections(allSubjects) {
  let randomSectionArray = [];
  let random = threeRandomIndices(allSubjects.length);

  let randomSubjectOne = allSubjects[random[0]];
  let randomSubjectTwo = allSubjects[random[1]];
  let randomSubjectThree = allSubjects[random[2]];

  let randomSectionOne =
    randomSubjectOne[getRandomIndex(randomSubjectOne.length)];
  let randomSectionTwo =
    randomSubjectTwo[getRandomIndex(randomSubjectTwo.length)];
  let randomSectionThree =
    randomSubjectThree[getRandomIndex(randomSubjectThree.length)];

  randomSectionArray.push(randomSectionOne);
  randomSectionArray.push(randomSectionTwo);
  randomSectionArray.push(randomSectionThree);

  return randomSectionArray;
}

function getRandomSeminar(allSubjects) {
  let randomClass = getRandomIndex(allSubjects[0].length);
  let randomSection = allSubjects[0][randomClass];
  return randomSection;
}

const ScheduleGenerator = () => {
  const [answer, setAnswer] = useState("Yes");
  const [courses, setCourses] = useState([]);
  const [seminars, setSeminars] = useState([]);
  const [mySections, setMySections] = useState([]);
  const [mySeminar, setMySeminar] = useState([]);

  async function generateSchedule() {
    if (courses.length === 0) {
      const randomArray = await getRandomCourses();
      const randomSeminars = await getRandomSeminars();
      setCourses(randomArray);
      setMySections(getRandomSections(randomArray));
      setSeminars(randomSeminars);
      setMySeminar(getRandomSeminar(randomSeminars));
    } else {
      setMySections(getRandomSections(courses));
      setMySeminar(getRandomSeminar(seminars));
    }
    if (answer === "No") {
      // Replace with another core
      setMySeminar(mySections[2]);
    }
  }

  return (
    <StyledSchedule>
      <div>
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
              value="No"
              className="form-check-input"
              onChange={() => {
                setAnswer("No");
              }}
              checked={answer === "No"}
            />
            No
          </label>
        </div>
      </div>
        <Button onClick={generateSchedule}> Generate Schedule </Button>
        {mySections.length !== 0 && (
          <Table
            course1={mySeminar.sectionID}
            class1={mySeminar.name}
            course2={mySections[0].sectionID}
            class2={mySections[0].name}
            course3={mySections[1].sectionID}
            class3={mySections[1].name}
            course4={mySections[2].sectionID}
            class4={mySections[2].name}
          ></Table>
        )}
      </StyledSchedule>
  );
};

function getRandomIndex(size) {
  return Math.floor(Math.random() * size);
}

function threeRandomIndices(size) {
  const one = Math.floor(Math.random() * size);
  let two = Math.floor(Math.random() * size);
  let three = Math.floor(Math.random() * size);

  let counter = 0;
  for (; one === two && counter < 10; counter++) {
    two = Math.floor(Math.random() * size);
  }
  for (; three === two && counter < 10; counter++) {
    three = Math.floor(Math.random() * size);
  }

  two = (one + 1) % size;
  three = (two + 1) % size;
  return [one, two, three];
}

export default ScheduleGenerator;

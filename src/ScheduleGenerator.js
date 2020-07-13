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
      //const registrationNumber = parseInt(courses[i].sections);

      let j = 0;
      for (j = 0; j < courses[i].sections.length; j++) {
        courses[i].sections[j].sectionID = id;
        // if (j % 2 == 0){
        //   courses[i].sections[j].registrationNumber = 11037;
        // }
        // else {
        //   courses[i].sections[j].registrationNumber = 9591;
        //
        // }

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
async function validateRegistration (arrayOfReges, newReg){
  let allReges = "";
  let i;
  for (i in arrayOfReges){
    allReges += arrayOfReges[i];
    allReges += ",";
  }
  allReges += newReg;
  const data = await fetch("https://schedge.a1liu.com/2020/FA/generateSchedule?registrationNumbers=" + allReges);
  const checkValidSchedule = await data.json();
  console.log(checkValidSchedule["valid"]);
  return checkValidSchedule["valid"];
}




function getRandomSections(allSubjects) {
  let randomSectionArray = [];
  let random = threeRandomIndices(allSubjects.length);
  let randomSubjectOne = allSubjects[random[0]];
  let randomSubjectTwo = allSubjects[random[1]];
  let randomSubjectThree = allSubjects[random[2]];

  let index1 = getRandomIndex(randomSubjectOne.length)
  let randomSectionOne = randomSubjectOne[index1];

  let index2 = getRandomIndex(randomSubjectTwo.length)
  let randomSectionTwo = randomSubjectTwo[index2];
  console.log(validateRegistration ([randomSectionOne.registrationNumber], randomSectionTwo.registrationNumber));
  while (validateRegistration ([randomSectionOne.registrationNumber], randomSectionTwo.registrationNumber) === "false"){
      index2 = getRandomIndex(randomSubjectTwo.length);
      randomSectionTwo = randomSubjectTwo[index2];

      console.log("conflictforSecondClass")
    }

  let index3 = getRandomIndex(randomSubjectThree.length)
  let randomSectionThree = randomSubjectThree[index3];
  console.log("WORKS2")

  while (validateRegistration ([randomSectionOne.registrationNumber, randomSectionTwo.registrationNumber], randomSectionThree.registrationNumber) === "false"){
      index3 = getRandomIndex(randomSubjectThree.length);
      randomSectionThree = randomSubjectThree[index3];
      console.log("conflictforThirdClass")
    }


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
      // let courseIdList = ""
      // courseIdList = courseIdList + mySeminar[registrationNumber + ",";
      // for (let i = 0; i < 3; i ++):
      //   courseIdList = courseIdList + mySections[i].registrationNumber + ",";

      //
      // const checkValidSchedule = Fetch
      // https://schedge.a1liu.com/2020/FA/generateSchedule?registrationNumbers=11276,11132
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
            time1 = {mySeminar.beginDate}
            course2={mySections[0].sectionID}
            class2={mySections[0].name}
            time2 = {mySections[0].meetings[0].beginDate}
            course3={mySections[1].sectionID}
            class3={mySections[1].name}
            time3 = {mySections[1].beginDate}
            course4={mySections[2].sectionID}
            class4={mySections[2].name}
            time4 = {mySections[2].beginDate}
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

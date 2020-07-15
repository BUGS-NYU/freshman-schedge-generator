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
      courses[i].instructor = courses[i].sections[0].instructors[0];
      courses[i].meetingDate = getDay(courses[i].sections[0].meetings[0].beginDate.charAt(9));
      courses[i].meetingTime = courses[i].sections[0].meetings[0].beginDate.substring(11, 16) + " EST";
      courses[i].registrationNumber = courses[i].sections[0].registrationNumber;

    }


    const allSubjects = [];
    allSubjects.push(courses);

    return allSubjects;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

// function meetingDates(){
//   let i;
//   console.log(mySections.length);
//   for (i = 0; i < mySections.length; i++){
//     mySections[i].meetingDate = "";
//     let j;
//     for (j = 0; j < mySections[i].meetings.length ; j++){
//       mySections[i].meetingDate += getDay(mySections[i].meetings[j].beginDate.charAt(9)) + mySections[i].meetings[j].beginDate.substring(10,16)
//     }
//     console.log(mySections[i].meetingDate)
//   }
//   console.log("hi 217")
//
// }

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

        courses[i].sections[j].meetingDate = "";
        let k;
        let time;
        for (k = 0; k < courses[i].sections[j].meetings.length; k++) {
          courses[i].sections[j].meetingDate += getDay(courses[i].sections[j].meetings[k].beginDate.charAt(9)) + " ";
          courses[i].sections[j].meetingTime = courses[i].sections[j].meetings[k].beginDate.substring(11, 16) +" EST";
        }
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
async function validateRegistration(arrayOfReges, newReg) {
  let allReges = arrayOfReges.join(",") + "," + newReg;
  const data = await fetch(
    "https://schedge.a1liu.com/2020/FA/generateSchedule?registrationNumbers=" +
      allReges
  );
  const checkValidSchedule = await data.json();
  console.log("validity" + checkValidSchedule["valid"]);
  return Boolean(checkValidSchedule["valid"]);
}

async function getRandomSections(allSubjects, allSubjectsSeminars) {
  let seminar = getRandomSeminar(allSubjectsSeminars);

  let randomSectionArray = [];
  let random = threeRandomIndices(allSubjects.length);
  console.log("3randoms" +random);
  let randomSubjectOne = allSubjects[random[0]];
  let randomSubjectTwo = allSubjects[random[1]];
  let randomSubjectThree = allSubjects[random[2]];

  let index1 = getRandomIndex(randomSubjectOne.length);
  let randomSectionOne = randomSubjectOne[index1];

  while (
    !await validateRegistration( [seminar.registrationNumber], randomSectionOne.registrationNumber)
   ) {
    index1 = getRandomIndex(randomSubjectTwo.length);
    randomSectionOne = randomSubjectOne[index1];

    console.log("conflictforFirstClass");
  }


  let index2 = getRandomIndex(randomSubjectTwo.length);
  let randomSectionTwo = randomSubjectTwo[index2];

  while (
    !await validateRegistration( [seminar.registrationNumber, randomSectionOne.registrationNumber], randomSectionTwo.registrationNumber)
  ) {
    index2 = getRandomIndex(randomSubjectTwo.length);
    randomSectionTwo = randomSubjectTwo[index2];

    console.log("conflictforSecondClass");
  }

  let index3 = getRandomIndex(randomSubjectThree.length);
  let randomSectionThree = randomSubjectThree[index3];
  // console.log("WORKS2");

  while (
    !await validateRegistration(
      [
        seminar.registrationNumber,
        randomSectionOne.registrationNumber,
        randomSectionTwo.registrationNumber,
      ],
      randomSectionThree.registrationNumber
    )
  ) {
    index3 = getRandomIndex(randomSubjectThree.length);
    randomSectionThree = randomSubjectThree[index3];
    console.log("conflictforThirdClass");
  }
  randomSectionArray.push(seminar);
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
      setSeminars(randomSeminars);
      let fullSchedule =  await getRandomSections(randomArray, randomSeminars);
      console.log(fullSchedule);
      setMySeminar( fullSchedule[0] );
      fullSchedule.shift();
      setMySections( fullSchedule);

      // https://schedge.a1liu.com/2020/FA/generateSchedule?registrationNumbers=11276,11132
    } else {

      let fullSchedule =  await getRandomSections(courses, seminars);
      console.log(fullSchedule);
      setMySeminar( fullSchedule[0] );
      fullSchedule.shift();
      setMySections( fullSchedule);
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
      <br />
      {mySections.length !== 0 && (
        <Table
          course1={mySeminar.registrationNumber}
          class1={mySeminar.name}
          date1={mySeminar.meetingDate}
          time1={mySeminar.meetingTime}
          professor1={mySeminar.instructor}

          course2={mySections[0].registrationNumber}
          class2={mySections[0].name}
          date2={mySections[0].meetingDate}
          time2={mySections[0].meetingTime}
          professor2={mySections[0].instructors[0]}

          course3={mySections[1].registrationNumber}
          class3={mySections[1].name}
          date3={mySections[1].meetingDate}
          time3={mySections[1].meetingTime}
          professor3={mySections[1].instructors[0]}

          course4={mySections[2].registrationNumber}
          class4={mySections[2].name}
          date4={mySections[2].meetingDate}
          time4={mySections[2].meetingTime}
          professor4={mySections[2].instructors[0]}

        ></Table>
      )}
    </StyledSchedule>
  );
};

function getDay(beginDate) {
  console.log(beginDate);
  if (beginDate === "2") {
    return "Wed";
  } else if (beginDate === "3") {
    return "Thur";
  } else if (beginDate === "4") {
    return "Fri";
  } else if (beginDate === "7") {
    return "Mon";
  }
    return "Tues";
}

function getRandomIndex(size) {
  return Math.floor(Math.random() * size);
}

function threeRandomIndices(size) {
  const one = Math.floor(Math.random() * size);
  let two = (one + 1) % size;
  let three = (two + 1) % size;
  return [one, two, three];
}

export default ScheduleGenerator;

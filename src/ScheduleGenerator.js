import React, { useState, useEffect } from "react";
import Button from "./Button";
// import styled from "styled-components";
import Table from "./Table";
import moment from "moment";
import StyledSelect from "./Select"; // default import
import StyledSchedule from "./StyledSchedule";
import { badMajors } from "./constants";

async function getAllCourses() {
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

        courses[i].sections[j].meetingDate = "";
        let k;
        for (k = 0; k < courses[i].sections[j].meetings.length; k++) {
          courses[i].sections[j].meetingDate +=
            getDay(courses[i].sections[j].meetings[k].beginDate.charAt(9)) +
            " ";
          courses[i].sections[j].meetingTime = moment(
            courses[i].sections[j].meetings[k].beginDate
          );
          courses[i].sections[j].meetingTime = courses[i].sections[
            j
          ].meetingTime.format("hh[:]mm A [ET]");

          courses[i].sections[j].endingTime = moment(
            courses[i].sections[j].meetings[k].beginDate
          ).add(courses[i].sections[j].meetings[k].minutesDuration, "minutes");
          courses[i].sections[j].endingTime = courses[i].sections[
            j
          ].endingTime.format("hh[:]mm A [ET]");
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

async function getAllSeminars() {
  try {
    const data = await fetch("https://schedge.a1liu.com/2020/FA/UA/FYSEM");
    // awaits for the promise to return the data
    const courses = await data.json();

    for (let i = 0; i < courses.length; i++) {
      const id = parseInt(courses[i].deptCourseId);
      courses[i].sectionID = id;
      courses[i].instructor = courses[i].sections[0].instructors[0];
      courses[i].meetingDate = getDay(
        courses[i].sections[0].meetings[0].beginDate.charAt(9)
      );
      courses[i].meetingTime = moment(
        courses[i].sections[0].meetings[0].beginDate
      );
      courses[i].meetingTime = courses[i].meetingTime.format("hh[:]mm A [ET]");
      courses[i].registrationNumber = courses[i].sections[0].registrationNumber;
      courses[i].endingTime = moment(
        courses[i].sections[0].meetings[0].beginDate
      ).add(courses[i].sections[0].meetings[0].minutesDuration, "minutes");
      courses[i].endingTime = courses[i].endingTime.format("hh[:]mm A [ET]");
    }

    return courses;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

function findSeminar(chosenSeminar, seminars) {
  //assuming its 1d
  if (chosenSeminar.toString() === "No Seminar") {
    return "";
  }
  let i;
  for (i = 0; i < seminars.length; i++) {
    if (chosenSeminar === seminars[i].name) {
      return seminars[i];
    }
  }
}

async function validateRegistration(arrayOfReges, newReg) {
  let allReges = arrayOfReges.join(",") + "," + newReg;
  const data = await fetch(
    "https://schedge.a1liu.com/2020/FA/generateSchedule?registrationNumbers=" +
      allReges
  );
  const checkValidSchedule = await data.json();
  return Boolean(checkValidSchedule["valid"]);
}

async function getMajor(chosenMajor) {
  if (chosenMajor.toString() === "No Major") {
    return "No Major";
  }
  const data = await fetch(
    "https://schedge.a1liu.com/2020/FA/UA/" + chosenMajor
  );
  const majors = await data.json();

  let majorClass = majors[0];
  majorClass.registrationNumber = majorClass.sections[0].registrationNumber;
  majorClass.instructors = {};
  majorClass.instructors[0] = majorClass.sections[0].instructors[0];
  majorClass.meetingDate = getDay(
    majorClass.sections[0].meetings[0].beginDate.charAt(9)
  );
  majorClass.meetingTime = moment(majorClass.sections[0].meetings[0].beginDate);
  majorClass.meetingTime = majorClass.meetingTime.format("hh[:]mm A [ET]");
  majorClass.endingTime = moment(
    majorClass.sections[0].meetings[0].beginDate
  ).add(majorClass.sections[0].meetings[0].minutesDuration, "minutes");
  majorClass.endingTime = majorClass.endingTime.format("hh[:]mm A [ET]");
  majorClass.name = majorClass.sections[0].name;
  return majorClass;
}

async function getRandomSections(
  allSubjects,
  chosenSeminar,
  allSubjectsSeminars,
  chosenMajor
) {
  try {
    let randomSectionArray = [];
    let random = fourRandomIndices(allSubjects.length);

    let seminar = findSeminar(chosenSeminar, allSubjectsSeminars);
    let randomSubjectOne = allSubjects[random[0]];
    let randomSubjectTwo = allSubjects[random[1]];
    let randomSubjectThree = allSubjects[random[2]];

    if (seminar === "") {
      let randomSubjectFour = allSubjects[random[3]];
      let index4 = getRandomIndex(randomSubjectFour.length);
      let fakeSeminar = randomSubjectFour[index4];
      seminar = fakeSeminar;
      seminar.instructor = fakeSeminar.instructors[0];
    }

    let index1 = getRandomIndex(randomSubjectOne.length);
    let randomSectionOne = randomSubjectOne[index1];

    let majorClass = await getMajor(chosenMajor);
    if (majorClass !== "No Major") {
      randomSectionOne = majorClass;
    }
    while (
      !(await validateRegistration(
        [seminar.registrationNumber],
        randomSectionOne.registrationNumber
      ))
    ) {
      index1 = getRandomIndex(randomSubjectTwo.length);
      randomSectionOne = randomSubjectOne[index1];
      // console.log("conflictforFirstClass");
    }

    let index2 = getRandomIndex(randomSubjectTwo.length);
    let randomSectionTwo = randomSubjectTwo[index2];
    while (
      !(await validateRegistration(
        [seminar.registrationNumber, randomSectionOne.registrationNumber],
        randomSectionTwo.registrationNumber
      ))
    ) {
      index2 = getRandomIndex(randomSubjectTwo.length);
      randomSectionTwo = randomSubjectTwo[index2];
      // console.log("conflictforSecondClass");
    }

    let index3 = getRandomIndex(randomSubjectThree.length);
    let randomSectionThree = randomSubjectThree[index3];
    while (
      !(await validateRegistration(
        [
          seminar.registrationNumber,
          randomSectionOne.registrationNumber,
          randomSectionTwo.registrationNumber,
        ],
        randomSectionThree.registrationNumber
      ))
    ) {
      index3 = getRandomIndex(randomSubjectThree.length);
      randomSectionThree = randomSubjectThree[index3];
      // console.log("conflictforThirdClass");
    }

    randomSectionArray.push(seminar);
    randomSectionArray.push(randomSectionOne);
    randomSectionArray.push(randomSectionTwo);
    randomSectionArray.push(randomSectionThree);

    return randomSectionArray;
  } catch (e) {
    console.log(e);
  }
}

const ScheduleGenerator = () => {
  // all course options
  const [courses, setCourses] = useState([]);
  const [seminars, setSeminars] = useState([]);
  const [majors, setMajors] = useState([]);

  // personal schedule
  const [mySections, setMySections] = useState([]); // all of your classes
  const [mySeminar, setMySeminar] = useState([]); // full seminar object that the person is taking
  const [chosenSeminar, setSeminar] = useState(["No Seminar"]); // what the user manually--is a name
  const [chosenMajor, setMajor] = useState("No Major");

  const logSubjects = async (e) => {
    if (seminars.length === 0) {
      const subjects = await getAllSeminars(); // 2d array

      let noSeminar = { name: "No Seminar" };
      subjects.unshift(noSeminar);

      setSeminars(subjects);
      return;
    }
  };

  const logMajorSubjects = async (e) => {
    if (majors.length === 0) {
      const response = await fetch("https://schedge.a1liu.com/subjects");
      const subjects = await response.json();

      let noMajor = { name: "No Major" };

      let keys = Object.keys(subjects["UA"]);
      let values = Object.values(subjects["UA"]);

      keys.unshift("No Major");
      values.unshift(noMajor);

      let majors = {};
      let i;
      for (i = 0; i < keys.length; i++) {
        majors[keys[i]] = values[i];
      }

      setMajors(majors);

      return;
    }
  };

  useEffect(() => {
    logSubjects();
  }, []);
  useEffect(() => {
    logMajorSubjects();
  }, []);

  async function generateSchedule() {
    let fullSchedule;
    if (courses.length === 0) {
      const randomCourses = await getAllCourses();
      setCourses(randomCourses);
      fullSchedule = await getRandomSections(
        randomCourses,
        chosenSeminar,
        seminars,
        chosenMajor
      );
    } else {
      fullSchedule = await getRandomSections(
        courses,
        chosenSeminar,
        seminars,
        chosenMajor
      );
    }
    if(fullSchedule !== undefined) {
      setMySeminar(fullSchedule[0]);
      fullSchedule.shift();
      setMySections(fullSchedule);
    }
  }

  function handleSeminarChange(event) {
    event.preventDefault();
    setSeminar(event.target.value); 
  }

  function handleMajorChange(event) {
    event.preventDefault();
    setMajor(event.target.value);
  }

  return (
    <StyledSchedule>
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <StyledSelect onChange={handleMajorChange}>
                  {Object.entries(majors)
                    .filter(([code, major]) => !badMajors.has(code))
                    .map(([code, major]) => {
                      return (
                        <option key={code} value={code}>
                          {" "}
                          {major.name}{" "}
                        </option>
                      );
                    })}
                </StyledSelect>
              </td>
              <td>
                <StyledSelect onChange={handleSeminarChange}>
                  {Object.entries(seminars).map(([name, seminar]) => {
                    return (
                      <option key={seminar.name} value={seminar.name}>
                        {" "}
                        {seminar.name}{" "}
                      </option>
                    );
                  })}
                </StyledSelect>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Button onClick={generateSchedule}> Generate Schedule </Button>
      {mySections.length !== 0 && (
        <Table
          courses={{
            firstCourse: {
              regNumber: mySeminar.registrationNumber,
              className: mySeminar.name,
              date: mySeminar.meetingDate,
              start: mySeminar.meetingTime,
              end: mySeminar.endingTime,
              instructor: mySeminar.instructor,
            },
            secondCourse: {
              regNumber: mySections[0].registrationNumber,
              className: mySections[0].name,
              date: mySections[0].meetingDate,
              start: mySections[0].meetingTime,
              end: mySections[0].endingTime,
              instructor: mySections[0].instructors[0],
            },
            thirdCourse: {
              regNumber: mySections[1].registrationNumber,
              className: mySections[1].name,
              date: mySections[1].meetingDate,
              start: mySections[1].meetingTime,
              end: mySections[1].endingTime,
              instructor: mySections[1].instructors[0],
            },
            fourthCourse: {
              regNumber: mySections[2].registrationNumber,
              className: mySections[2].name,
              date: mySections[2].meetingDate,
              start: mySections[2].meetingTime,
              end: mySections[2].endingTime,
              instructor: mySections[2].instructors[0],
            },
          }}
        ></Table>
      )}
    </StyledSchedule>
  );
};

// Calculations Functions
function getDay(beginDate) {
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

function fourRandomIndices(size) {
  const one = Math.floor(Math.random() * size);
  let two = (one + 1) % size;
  let three = (two + 1) % size;
  let four = (three + 1) % size;
  return [one, two, three, four];
}

export default ScheduleGenerator;

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

const StyledScheduleOutput = styled.div`
  display: flex;
`;

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

  let random = twoRandomIndices(allSubjects.length);

  let randomSubjectOne = allSubjects[random[0]];
  let randomSubjectTwo = allSubjects[random[1]];

  let randomSectionOne =
    randomSubjectOne[getRandomIndex(randomSubjectOne.length)];
  let randomSectionTwo =
    randomSubjectTwo[getRandomIndex(randomSubjectTwo.length)];

  randomSectionArray.push(randomSectionOne);
  randomSectionArray.push(randomSectionTwo);

  return randomSectionArray;
}

const ScheduleGenerator = () => {
  const [courses, setCourses] = useState([]);
  const [randomSection, setRandomSection] = useState([]);

  async function generateSchedule() {
    if (courses.length === 0) {
      const randomArray = await getRandomCourses();

      setCourses(randomArray);
      setRandomSection(getRandomSections(randomArray));
    } else {
      setRandomSection(getRandomSections(courses));
    }
  }

  return (
    <StyledSchedule>
      <Button onClick={generateSchedule}> Generate Schedule </Button>
      {randomSection.length !== 0 && (
        <Table
          course1={randomSection[0].sectionID}
          class1={randomSection[0].name}
          course2={randomSection[1].sectionID}
          class2={randomSection[1].name}
        ></Table>
      )}
    </StyledSchedule>
  );
};

function getRandomIndex(size) {
  return Math.floor(Math.random() * size);
}

function twoRandomIndices(size) {
  const one = Math.floor(Math.random() * size);
  let two = Math.floor(Math.random() * size);

  let counter = 0;
  for (; one === two && counter < 10; counter++) {
    two = Math.floor(Math.random() * size);
  }

  two = (one + 1) % size;
  return [one, two];
}

// async functions always return a promise

export default ScheduleGenerator;

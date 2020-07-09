import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";
import StyledSelect from "./Select"; // default import
import {badMajors} from "./constants" // named import

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const majorOptions = {
  "nothing": "Choose a major",
  "Computer Science": "CS",
  "English": "Eng",
  "Chemistry": "Chem",
  "Math": "Math"
};

function MajorForm() {
  const [majors, setMajors] = useState([]);
  const logSubjects = async (e) => {
    if (majors.length === 0) {
      const response = await fetch("https://schedge.a1liu.com/subjects")
      const subjects = await response.json();

      setMajors(subjects['UA']);
      console.log(subjects['UA']);
      return;
    }
    console.log(majors);
  };

  const [major, setMajor] = useState("nothing");
  const [search, setSearch] = useState("nothing");
  useEffect( () => { // called when you changed things
    console.log("hi");
    logSubjects();

  }, []);
  function handleChange(event) {
    event.preventDefault();
    setMajor(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    alert(`You choose ${major}. You searched for ${search}.`);

  }

  return (
    <Form onSubmit={handleSubmit}>
      <StyledSelect onChange={handleChange}>
       {Object.entries(majors)
         .filter( ([code,major])=>  !(badMajors.has(code)) )
         .map( ([code,major]) =>  {return <option key={code} value={code}> {major.name} </option>})
       }

      </StyledSelect>
      <p>You chose {major}.</p>
      <Input
        type="text"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <br />
      <Button>Submit</Button>
    </Form>
  );
}

export default MajorForm;

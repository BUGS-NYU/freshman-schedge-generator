import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./Button";
import StyledInput from "./Input";
import StyledSelect from "./Select";
import Majors from "./Majors"; // default import
import {badMajors} from "./constants" // named import

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

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
    alert("You choose " + major + ". You searched for " + search + ".");
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledSelect onChange={handleChange}>
       {Object.entries(majors)
         .filter( ([code,major])=>  !(badMajors.has(code)) )
         .map( ([code,major]) =>  {return <option key={code} value={code}> {major.name} </option>})
       }

      </StyledSelect>
      <p>You chose {major}.</p>
      <StyledInput
        type="text"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <br />
      <Button>Submit</Button>
    </StyledForm>
  );
}

export default MajorForm;

import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import StyledInput from "./Input";
import StyledSelect from  "./Select"

const StyledForm = styled.form`
display: flex;
flex-direction: column;

align-items: center;
padding: 10px;
`;

// const StyledInput = styled.input`
//   border: 2px solid black;
//   padding-left: 10px;
//   color: black;
//   width: 300px;
//   height: 35px;
//   font-size: 20px;
//   border-radius: 5px;
// `;

function MajorForm() {
  const [major, setMajor] = useState("nothing");
  const [search, setSearch] = useState("nothing");

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
        <option value="nothing">Choose a major</option>
        <option value="Computer Science">CS</option>
        <option value="English">Eng</option>
        <option value="Chemistry">Chem</option>
        <option value="Math">Math</option>
      </StyledSelect>
      <p>You chose {major}.</p>
      <StyledInput
        type="text"

        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <br/>
      <Button>Submit</Button>
    </StyledForm>
  );
}

export default MajorForm;

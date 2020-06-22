import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import StyledInput from "./Input";
import StyledSelect from "./Select";

const StyledForm = styled.form`
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
  const [major, setMajor] = useState("nothing");
  const [search, setSearch] = useState("nothing");

  function handleChange(event) {
    event.preventDefault();
    setMajor(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    alert(`You choose ${major}. You searched for ${search}.`);

  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledSelect onChange={handleChange}>
        {
          Object.keys(majorOptions).map(key => 
            <option key={key} value={key}>{majorOptions[key]}</option>
          )
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

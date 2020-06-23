import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";

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
    <Form onSubmit={handleSubmit}>
      <Select onChange={handleChange}>
        {
          Object.keys(majorOptions).map(key => 
            <option key={key} value={key}>{majorOptions[key]}</option>
          )
        }
      </Select>
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

import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";

function MajorForm() {
  const [major, setMajor] = useState("");

  function handleChange(event) {
    event.preventDefault();
    setMajor(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    alert(major);
  }

  return (
    <form onSubmit={handleSubmit}>
      <select onChange={handleChange}>
        <option value="nothing :(">Choose an option</option>
        <option value="Computer Science">CS</option>
        <option value="English">Eng</option>
        <option value="Chemistry">Chem</option>
        <option value="Math">Math</option>
      </select>

      <p>You chose {major}.</p>

      <Button>Submit</Button>
    </form>
  );
}

export default MajorForm;

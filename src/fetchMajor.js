import React, { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: #90caf9;
  border: none;
  width: 100px;
  height: 35px;
`;

const FetchMajor = () => {
  let majors = [];
  fetch("https://schedge.a1liu.com/subjects")
    .then((data) => data.json())
    .then((data) => addMajors(data));
  const handler = (e) => {
    e.preventDefault();
    console.log(majors);
  };
  function addMajors(majorData) {
    for (let key in majorData.UA) {
      majors.push(majorData.UA[key].name);
    }
    majors.sort(); //alphabetical sort
  }
  return (
    <div>
      <Button onClick={handler}>Show Majors</Button>
    </div>
  );
};
export default FetchMajor;

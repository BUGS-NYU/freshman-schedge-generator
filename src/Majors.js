import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: #90caf9;
  border: none;
  width: 100px;
  height: 35px;
`;

const Majors = () => {
  const [majors, setMajors] = useState();

  useEffect(() => {
    fetch("https://schedge.a1liu.com/subjects")
    .then((data) => data.json())
    .then((data) => setMajors(data['UA']));   
  });

  const logSubjects = (e) => {
    e.preventDefault();
    console.log(majors);
  };

  return (
    <div>
      <Button onClick={logSubjects}>Show Majors</Button>
    </div>
  );
};
export default Majors;

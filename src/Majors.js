import React, { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: #90caf9;
  border: none;
  width: 100px;
  height: 35px;
`;

const Majors = () => {
  const [majors, setMajors] = useState([]);

  const logSubjects = async (e) => {
    e.preventDefault();
    if (majors.length === 0) {
      const response = await fetch("https://schedge.a1liu.com/subjects")
      const subjects = await response.json();

      setMajors(subjects['UA']);
      console.log(subjects['UA']);
      return;
    }
    console.log(majors);
  };

  return (
    <div>
      <Button onClick={logSubjects}>Show Majors</Button>
    </div>
  );
};
export default Majors;

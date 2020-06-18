import React, { useState } from 'react';
import styled from 'styled-components';
const Button = styled.button`
  min-width: 10px;
  background-color: red;
`;

const Major = () => {
  const [major, setMajor] =  useState([]);
 
  const handler = (e) => {
    e.preventDefault();
    fetch('https://schedge.a1liu.com/subjects')
      .then(data => data.json())
      .then(data => setMajor(data));
  }
  return (
    <div>
      <h1>
      Hello world
      </h1>
      <Button onClick = {handler}>

      </Button>
    </div>
  )
}
 export default Major;

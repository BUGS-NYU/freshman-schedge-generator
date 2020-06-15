import React from "react";
import logo from "./logo.svg";
import styled from "styled-components";
import "./App.css";

const StyledButton = styled.button`
  background-color: #90caf9;
  border: none;
  color: black;
  width: 100px;
  height: 35px;
  font-size: 15px;
  border-radius: 5px;
  text-transform: uppercase;
  transition: 0.2s filter;
  :hover {
    filter: brightness(75%);
  }
`;

// you always pass down a handle and you receive an on
function Button({ onClick, children }) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

export default Button;

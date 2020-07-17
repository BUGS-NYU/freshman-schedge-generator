import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #969595;
  border: 2px solid black;

  color: white;
  font-weight:bold;
  width: 200px;
  height: 50px;
  font-size: 20px;
  border-radius: 5px;
  font-family: Courier New;
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

import React from "react";
import "./App.css";
import ScheduleGenerator from "./ScheduleGenerator";
import styled, {keyframes} from "styled-components";
import StyledHeader from "./Header";

const AllContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const scalein = keyframes`
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1);
  }
`

const StyledTitle = styled.h1`
  font-size: 50px;
  font-family: Courier New;
  margin-top: 30px;
  margin-bottom: 10px;
  text-align: center;
  color: #330662;
  animation: ${scalein} 1s;
`;

const HomeLink = styled.a`
  text-decoration: none;
  color: white;
`;

const App = () => {
  return (
    <AllContent>
      <StyledHeader>
        {" "}
        <HomeLink href="/">ALBERTA</HomeLink>{" "}
      </StyledHeader>
      <StyledTitle>NYU CAS SCHEDULE GENERATOR</StyledTitle>
      <ScheduleGenerator />
    </AllContent>
  );
};

export default App;

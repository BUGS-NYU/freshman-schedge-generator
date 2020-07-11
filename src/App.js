import React from "react";
import "./App.css";
import logo from "./logo.jpg";
import ScheduleGenerator from "./ScheduleGenerator";
import styled from "styled-components";
import MajorForm from "./MajorForm";
import StyledHeader from "./Header";

const MainContent = styled.div`
  background-image: url("${logo}");
  background-repeat: none;
  /* height: calc(100vh)s ; */
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = () => {
  return (
    <div>
      <StyledHeader> ALBERTA</StyledHeader>
      <MainContent>
        <MajorForm></MajorForm>
        <ScheduleGenerator />
      </MainContent>
    </div>
  );
};

export default App;

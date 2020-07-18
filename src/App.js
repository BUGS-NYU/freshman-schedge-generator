import React from "react";
import "./App.css";
import ScheduleGenerator from "./ScheduleGenerator";
import styled from "styled-components";
import StyledHeader from "./Header";
import StyledFooter from "./Footer";

const MainContent = styled.div``;

const App = () => {
  return (
    <div>
      <StyledHeader> ALBERTA </StyledHeader>
      <MainContent>
        <br />
        <br />
        <center>
          <h1
            style={{
              fontSize: "50px",
              fontFamily: "Courier New",
              marginTop: "0px",
            }}
          >
            {" "}
            NYU CAS SCHEDULE GENERATOR{" "}
          </h1>
        </center>
        <ScheduleGenerator />
        <StyledFooter> </StyledFooter>
      </MainContent>
    </div>
  );
};

export default App;

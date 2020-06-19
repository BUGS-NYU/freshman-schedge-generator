import React from "react";
import "./App.css";
import logo from "./logo.jpg";
import styled from "styled-components";

import MajorForm from "./MajorForm";
import StyledHeader from "./Header";
import Button from "./Button";

const MainContent = styled.div`
  background-image: url("${logo}");
  background-repeat: cover;
  height: calc(100vh - 50px);
`;

function App() {
  return (
    <div>
      <StyledHeader> ALBERTA</StyledHeader>

      <MainContent>
        <MajorForm></MajorForm>
      </MainContent>
    </div>
  );
}

export default App;

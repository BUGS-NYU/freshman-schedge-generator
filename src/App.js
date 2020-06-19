import React from 'react';
import logo from './logo.svg';
import './App.css';
import Majors from './Majors';
import SeminarForm from "./SeminarForm";

const App = () => {
  return (
    <div className="App">
      <SeminarForm />
      <Majors></Majors>
    </div>
  );
};

export default App;

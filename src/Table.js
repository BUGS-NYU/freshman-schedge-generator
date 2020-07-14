import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  border: 2px solid black;
  color: black;
  background-color: #e8e6e4;
  width: 60%;
  height: 50px;
  font-size: 40px;
  font-family: Courier New;
  border-width: 5px;
`;

const StyledTD = styled.td`
  padding: 10px;
  border: 1px solid black;
`;

function Table({
  course1,
  course2,
  course3,
  course4,
  class1,
  class2,
  class3,
  class4,
  time1,
  time2,
  time3,
  time4,
}) {
  return (
    <StyledTable>
      <tbody>
        <tr>
          <StyledTD> Course ID </StyledTD> <StyledTD> Meetings </StyledTD>{" "}
          <StyledTD> Class </StyledTD>
        </tr>
        <tr>
          {" "}
          <StyledTD> {course1} </StyledTD> <StyledTD> {time1}</StyledTD>{" "}
          <StyledTD> {class1}</StyledTD>
        </tr>{" "}
        <tr>
          {" "}
          <StyledTD> {course2} </StyledTD> <StyledTD> {time2}</StyledTD>{" "}
          <StyledTD> {class2} </StyledTD>{" "}
        </tr>
        <tr>
          {" "}
          <StyledTD> {course3}</StyledTD> <StyledTD> {time3}</StyledTD>{" "}
          <StyledTD> {class3} </StyledTD>{" "}
        </tr>
        <tr>
          {" "}
          <StyledTD> {course4} </StyledTD> <StyledTD> {time4}</StyledTD>{" "}
          <StyledTD> {class4}</StyledTD>{" "}
        </tr>
      </tbody>
    </StyledTable>
  );
}

export default Table;

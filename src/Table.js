import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  border: 2px solid black;

  color: black;
  width: 60%;
  height: 50px;
  font-size: 40px;
  font-family: Courier New;
  border-width:5px;
`;

const StyledTD= styled.td`
  padding: 10px;
  border:1px solid black;
`;

function Table({course1, course2, class1,class2,class3,class4}) {
  return <StyledTable>
  <tbody>
  <tr> <StyledTD> {course1} </StyledTD> <StyledTD> {class1}</StyledTD>
  </tr> <tr> <StyledTD> {course2} </StyledTD> <StyledTD> {class2} </StyledTD> </tr>
  <tr> <StyledTD> #3</StyledTD> <StyledTD> {class3} </StyledTD> </tr>
  <tr> <StyledTD> #4 </StyledTD> <StyledTD> {class4}</StyledTD> </tr>
  </tbody>
  </StyledTable>;
}

export default Table;

// <tr> <StyledTD> #1 </StyledTD> <StyledTD> class</StyledTD> </tr> <tr> <StyledTD> #2 </StyledTD> <StyledTD> class </StyledTD> </tr>   <tr> <StyledTD> #3</StyledTD> <StyledTD> class </StyledTD> </tr> <tr> <StyledTD> #4 </StyledTD> <StyledTD> class</StyledTD> </tr>

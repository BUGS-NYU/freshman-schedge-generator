import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  border: 2px solid black;
  color: black;
  background-color: #e8e6e4;
  width: 60%;
  height: 50px;
  font-size: 20px;
  font-family: Courier New;
  border-width: 5px;
  margin: 15px;
`;

const StyledTD = styled.td`
  padding: 10px;
  border: 1px solid black;
`;

const StyledTDH = styled.td`
  padding: 10px;
  border: 1px solid black;
  font-weight: bold;
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
  end1,
  end2,
  end3,
  end4,
  professor1,
  professor2,
  professor3,
  professor4,
  date1,
  date2,
  date3,
  date4
}) {
  return (
    <StyledTable>
      <tbody>
        <tr>
        <StyledTDH>Registration Number</StyledTDH><StyledTDH>Day(s)</StyledTDH><StyledTDH>Start Time</StyledTDH><StyledTDH>End Time</StyledTDH><StyledTDH>Class</StyledTDH><StyledTDH>Professor</StyledTDH>
        </tr>
        <tr>
          <StyledTD>{course1}</StyledTD><StyledTD>{date1}</StyledTD><StyledTD>{time1}</StyledTD><StyledTD>{end1}</StyledTD><StyledTD>{class1}</StyledTD><StyledTD>{professor1}</StyledTD>
        </tr><tr>
          <StyledTD>{course2}</StyledTD><StyledTD>{date2}</StyledTD><StyledTD>{time2}</StyledTD><StyledTD>{end2}</StyledTD><StyledTD>{class2}</StyledTD><StyledTD>{professor2}</StyledTD>
        </tr><tr>
          <StyledTD>{course3}</StyledTD><StyledTD>{date3}</StyledTD><StyledTD>{time3}</StyledTD><StyledTD>{end3}</StyledTD><StyledTD>{class3}</StyledTD><StyledTD>{professor3}</StyledTD>
        </tr><tr>
          <StyledTD>{course4}</StyledTD><StyledTD>{date4}</StyledTD><StyledTD>{time4}</StyledTD><StyledTD>{end4}</StyledTD><StyledTD>{class4}</StyledTD><StyledTD>{professor4}</StyledTD>
        </tr>
      </tbody>
    </StyledTable>
  );
}

export default Table;

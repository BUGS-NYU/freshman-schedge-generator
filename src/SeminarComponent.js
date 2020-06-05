import React from 'react';
const SeminarComponent = ()=>{
  return (
    <div style = {{color:'blue'}}>
      Do you want to take a seminar?
      <br></br>
    <input type="checkbox" id="option2" name="option2" value="two"/>
    <label for="vehicle1"> No</label>
    <br></br>
    <input type="checkbox" id="option1" name="option1" value="one"/>
    <label for="vehicle1"> Yes</label>
    </div>
  );
}


export default SeminarComponent;

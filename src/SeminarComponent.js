import React from 'react';
const SeminarComponent = ()=>{
  return (
    <div style = {{color:'blue'}}>
    <form>
        Do you want to take a seminar?
        <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value="option1"
              className="form-check-input"
            />
            Yes
          </label>
        </div>

        <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value="option2"
              className="form-check-input"
            />
            No
          </label>
        </div>

        <div className="form-group">
          <button className="button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}


export default SeminarComponent;

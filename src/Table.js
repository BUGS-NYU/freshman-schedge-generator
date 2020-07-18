import React from "react";

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
  date4,
}) {
  return (
    <div className="Rtable Rtable--6cols Rtable--collapse">
      <div className="Rtable-cell reg-num Rtable-cell--head"><h3>Reg Number</h3></div>
      <div className="Rtable-cell date"><h3>Day(s)</h3></div>
      <div className="Rtable-cell start"><h3>Start Time</h3></div>
      <div className="Rtable-cell end"><h3>End Time</h3></div>
      <div className="Rtable-cell class-name"><h3>Class</h3></div>
      <div className="Rtable-cell professor Rtable-cell--foot"><h3>Professor</h3></div>

      <div className="Rtable-cell reg-num Rtable-cell--head">{course1}</div>
      <div className="Rtable-cell date">{date1}</div>
      <div className="Rtable-cell start">{time1}</div>
      <div className="Rtable-cell end">{end1}</div>
      <div className="Rtable-cell class-name">{class1}</div>
      <div className="Rtable-cell professor Rtable-cell--foot">{professor1}</div>

      <div className="Rtable-cell reg-num Rtable-cell--head">{course2}</div>
      <div className="Rtable-cell date">{date2}</div>
      <div className="Rtable-cell start">{time2}</div>
      <div className="Rtable-cell end">{end2}</div>
      <div className="Rtable-cell class-name">{class2}</div>
      <div className="Rtable-cell professor Rtable-cell--foot">{professor2}</div>

      <div className="Rtable-cell reg-num Rtable-cell--head">{course3}</div>
      <div className="Rtable-cell date">{date3}</div>
      <div className="Rtable-cell start">{time3}</div>
      <div className="Rtable-cell end">{end3}</div>
      <div className="Rtable-cell class-name">{class3}</div>
      <div className="Rtable-cell professor Rtable-cell--foot">{professor3}</div>

      <div className="Rtable-cell reg-num Rtable-cell--head">{course4}</div>
      <div className="Rtable-cell date">{date4}</div>
      <div className="Rtable-cell start">{time4}</div>
      <div className="Rtable-cell end">{end4}</div>
      <div className="Rtable-cell class-name">{class4}</div>
      <div className="Rtable-cell professor Rtable-cell--foot">{professor4}</div>
    </div>
  );
}

export default Table;

import React from "react";
import "./Calender.scss";
import { TiArrowSortedDown } from "react-icons/ti";
import dayjs from "dayjs";
import {useNavigate } from "react-router-dom";
var today = new Date();
var month = today.getMonth();
var year = today.getFullYear();
// var count = false;
const Calender = () => {
  const [shownMonth, setShownMonth] = React.useState(
    dayjs().month(month).format("MMMM")
  );
  const [shownYear, setShownYear] = React.useState(
    dayjs().year(year).format("YYYY")
  );
  const [emptyMonths, setEmptyMonths] = React.useState([]);
  const [shownCalender, setShownCalender] = React.useState([]);
  const NextMonth = () => {
    if (shownMonth === "December") {
      setShownYear((year) => {
        console.log("SetShownYear next Working");
        return Number(year) + 1;
      });
      month = 0;
    } else {
      month += 1;
    }
    setShownMonth(dayjs().month(month).format("MMMM"));
  };
  const PrevMonth = () => {
    if (shownMonth === "January") {
      setShownYear((year) => {
        console.log("SetShownYear prev Working");
        return Number(year) - 1;
      });
      month = 11;
    } else {
      month = month - 1;
    }
    setShownMonth(dayjs().month(month).format("MMMM"));
  };
  const PrevYear = () => {
    setShownYear((year) => Number(year) - 1);
  };
  const NextYear = () => {
    setShownYear((year) => Number(year) + 1);
  };
  React.useEffect(() => {
    document.getElementById("Month").innerText = `${shownMonth}`;
    document.getElementById("Year").innerText = `${shownYear}`;

    // eslint-disable-next-line
  }, [shownMonth, shownYear]);
  React.useEffect(() => {
    var day = new Date(shownYear + "-" + shownMonth + "-01").getDay();
    // console.log(day);
    function getNumberOfDays() {
      return new Date(shownYear, month + 1, 0).getDate();
    }
    var dayss = getNumberOfDays();
    // console.log("Dayss is"+dayss)
    setEmptyMonths(() => {
      return [];
    });
    setEmptyMonths((emptyMonth) => {
      for (let i = 1; i <= day; i++) {
        emptyMonth.push(<EmptyCard date={31 + i - day} />);
      }
      return emptyMonth;
    });
    setShownCalender(() => {
      return [];
    });
    setShownCalender((prevCalender) => {
      for (let j = 1; j <= dayss; j++) {
        prevCalender.push(
          <CalDateCard date={j} month={month + 1} year={shownYear} />
        );
      }
      return prevCalender;
    });
    // eslint-disable-next-line
  }, [shownYear, shownMonth]);
  return (
    <div className="calender-main">
      <h1>Calender</h1>
      <div className="top-cal">
        <div className="cal-button">
          <span className="leftArrow" onClick={PrevYear}>
            <TiArrowSortedDown
              className="year-cal"
              style={{ transform: "rotate(90deg)" }}
            />
            <TiArrowSortedDown style={{ transform: "rotate(90deg)" }} />
          </span>
          <span className="leftArrow" onClick={PrevMonth}>
            <TiArrowSortedDown
              className="month-cal"
              style={{ transform: "rotate(90deg)" }}
            />
          </span>
          <h3>
            <div id="Month" style={{ display: "inline" }}>
              {shownMonth}
            </div>{" "}
            <div id="Year" style={{ display: "inline" }}>
              {shownYear}
            </div>
          </h3>
          <span className="rightArrow" onClick={NextMonth}>
            <TiArrowSortedDown
              className="month-cal"
              style={{ transform: "rotate(-90deg)" }}
            />
          </span>
          <span className="rightArrow" onClick={NextYear}>
            <TiArrowSortedDown
              className="year-cal"
              style={{ transform: "rotate(-90deg)" }}
            />
            <TiArrowSortedDown style={{ transform: "rotate(-90deg)" }} />
          </span>
        </div>
        <div
          style={{
            background: "black",
            height: "1px",
            width: "100%",
            opacity: "0.1",
          }}
        ></div>
        <div className="days">
          <div className="month">Sun</div>
          <div className="month">Mon</div>
          <div className="month">Tue</div>
          <div className="month">Wed</div>
          <div className="month">Thu</div>
          <div className="month">Fri</div>
          <div className="month">Sat</div>
        </div>
      </div>
      <div className="calMain">
        {emptyMonths}
        {shownCalender}
      </div>
    </div>
  );
};

const CalDateCard = ({ date, month, year }) => {
  const Navigate=useNavigate()
  var clickedMonth;
  const handleCalenderClick = async () => {
    const getDetails = await fetch("https://authking.onrender.com/user/getTasksforDate", {
      method: "POST",
      body: JSON.stringify({ Date: clickedMonth }),
      headers: {
        authToken: localStorage.getItem("authKey"),
        "Content-type": "application/json",
      },
      referrerPolicy: "origin-when-cross-origin",
    });
    const res = await getDetails.json();
    console.log(res);
    if(res.Success)
    {
      const endpoint= res.TasksForDate._id.slice(0,5)
      console.log(endpoint)
      Navigate(`/user/${endpoint}`)
    }
  };
  return (
    <div
      className="calDateCard"
      onClick={() => {
        date = date < 10 ? "0" + date : date;
        month = month < 10 ? "0" + month : month;
        year = String(year).slice(2, 4);
        clickedMonth = date + "/" + month + "/" + year;
        setTimeout(()=>{
            handleCalenderClick();
        },3000)
      }}
    >
      <div className="datehead">
        <h4>{date}</h4>
      </div>
      <div className="dateTasks">8 Tasks</div>
    </div>
  );
};
const EmptyCard = (props) => {
  return (
    <div className="calDateCard">
      <div className="datehead">
        <h4>{props.date}</h4>
      </div>
      <div className="dateTasks">Empty</div>
    </div>
  );
};
export default Calender;
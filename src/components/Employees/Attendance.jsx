import React, { useEffect, useState } from "react";
import {
  markEmployeeAttendance,
  viewEmployeeAttendance,
  getOnnEmployeeLeaderAttendence,
} from "../../http";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../Loading";

const Attendance = () => {
  const { user } = useSelector((state) => state.authSlice);
  const [isAttendanceMarked, setIsAttendanceMarked] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [attendance, setAttendance] = useState();

  const years = [2020, 2021, 2022, 2023, 2024]; // Customize this as needed
  const months = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const monthDays = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };
  const numOfDays = monthDays[selectedMonth];
  const days = Array.from({ length: numOfDays }, (_, index) => index + 1);

  useEffect(() => {
    const storedData = localStorage.getItem(user.id);
    if (storedData) {
      const data = JSON.parse(storedData);
      console.log(data);
      const dt = data.date + "/" + data.month + "/" + data.year;
      if (dt === new Date().toLocaleDateString()) {
        setIsAttendanceMarked(true);
      } else localStorage.clear();
    }
  }, []);

  useEffect(async () => {
    let date = selectedDay + "/" + selectedMonth + "/" + selectedYear;
    const res = await getOnnEmployeeLeaderAttendence({
      date: date,
      id: user.id,
    });
    console.log(res);
    setAttendance(res);
  }, []);

  const markAttendance = async () => {
    const res = await markEmployeeAttendance({ employeeID: user.id });
    const { success } = res;
    if (success) {
      toast.success(res.message);
      const { newAttendance } = res;
      const attendanceData = JSON.stringify(newAttendance);
      localStorage.setItem(user.id, attendanceData);
      setIsAttendanceMarked(true);
    }
  };

  const searchAttendance = async () => {
    const obj = {
      employeeID: user.id,
    };
    if (selectedYear) {
      obj["year"] = selectedYear;
    }
    if (selectedMonth) {
      obj["month"] = months.findIndex((month) => month === selectedMonth) + 1;
    }
    if (selectedDay) {
      obj["date"] = selectedDay;
    }
    let date = selectedDay + "/" + selectedMonth + "/" + selectedYear;
    console.log(date);
    const res = await getOnnEmployeeLeaderAttendence({
      date: date,
      id: user.id,
    });
    console.log(res);
    setAttendance(res);
  };
  return (
    <>
      {attendance ? (
        <div className="main-content">
          <section className="section">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h4>Attendance</h4>
                <button
                  className={`btn btn-lg ${
                    isAttendanceMarked ? "btn-secondary" : "btn-primary"
                  } btn-icon-split`}
                  onClick={markAttendance}
                >
                  {isAttendanceMarked ? "Attendance Marked" : "Mark Attendance"}
                </button>
              </div>
            </div>

            <div className="d-flex justify-content-center w-100">
              <div className="col">
                <select
                  className="form-control select2"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="">Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col">
                <select
                  className="form-control select2"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option value="">Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col">
                <select
                  className="form-control select2"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                >
                  <option value="">Day</option>
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={searchAttendance}
                className="btn btn-lg btn-primary col"
              >
                Search
              </button>
            </div>
          </section>
          <div className="table-responsive">
            <table className="table table-striped table-md center-text">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>checkin</th>
                  <th>checkout</th>
                  <th>Lateby</th>
                  <th>overtiming</th>
                  <th>remark</th>
                </tr>
              </thead>
              <tbody>
                {attendance?.map((attendance, idx) => (
                  <tr>
                    <td>{idx + 1}</td>
                    <td>{attendance.employeeID.name}</td>
                    <td>{attendance.date}</td>
                    <td>{attendance.checkin}</td>
                    <td>{attendance.checkout}</td>
                    <td>{attendance.lateby}</td>
                    <td>{attendance.overtiming}</td>
                    <td>
                      {attendance.present === true ? "Present" : "Absent"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Attendance;

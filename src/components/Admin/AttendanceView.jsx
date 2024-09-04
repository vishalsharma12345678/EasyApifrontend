import React, { useEffect, useState } from "react";
import {
  getAttendance,
  getEmployees,
  getLeaders,
  getOneEmployeeAttendence,
} from "../../http";
import Loading from "../Loading";

const AttendanceView = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [attendance, setAttendance] = useState();
  const [employeeMap, setEmployeeMap] = useState();
  const [employees, setEmployees] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState();

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
    const dt = new Date();
    const obj = {
      year: dt.getFullYear(),
      month: dt.getMonth() + 1,
      date: dt.getDate(),
    };
    let empObj = {};
    const fetchData = async () => {
      const res = await getAttendance(obj);

      const { data } = res;
      console.log(data);
      setAttendance(data);
    };
    const fetchEmployees = async () => {
      const emps = await getEmployees();
      const leaders = await getLeaders();
      emps.data.forEach(
        (employee) => (empObj[employee.id] = [employee.name, employee.email])
      );
      leaders.data.forEach(
        (leader) => (empObj[leader.id] = [leader.name, leader.email])
      );
      setEmployeeMap(empObj);
      setEmployees([...emps.data, ...leaders.data]);
    };
    fetchEmployees();
    fetchData();
  }, []);

  const searchAttendance = async () => {
    const obj = {};
    if (selectedEmployee) {
      obj["employeeID"] = selectedEmployee;
    }
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
    const res = await getOneEmployeeAttendence({
      date: date,
      id: selectedEmployee,
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
              </div>
            </div>

            <div className="d-flex justify-content-center w-100">
              <div className="col">
                <select
                  className="form-control select2"
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                  <option value="">Employees</option>
                  {employees?.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>

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

export default AttendanceView;

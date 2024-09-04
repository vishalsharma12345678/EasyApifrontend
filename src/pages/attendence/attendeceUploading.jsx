import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getEmployeeAttendence } from "../../http";
import { updateEmployeeAttendence } from "../../http";

const AttendenceUpload = () => {
  const { user } = useSelector((state) => state.authSlice);
  //   console.log(user);
  const [EmployeeAttendence, setEmployeeAttendence] = useState([]);
  const [date, setdate] = useState(Date.now());
  const [inputEditable, setinputEditable] = useState(0);
  const [Attendencedata, setAttendencedata] = useState([]);
  function handleChangedata(e, index) {
    const updatedTodo = {
      ...Attendencedata[index],
      [e.target.name]: e.target.value,
    };
    const newTodos = [...Attendencedata];
    newTodos[index] = updatedTodo;
    setAttendencedata(newTodos);
  }

  useEffect(() => {
    (async () => {
      let newdate =
        new Date(date).getDate() +
        "/" +
        (new Date(date).getMonth() + 1) +
        "/" +
        new Date(date).getFullYear();
      const res = await getEmployeeAttendence({ date: newdate });
      //   console.log(res)
      if (res) setEmployeeAttendence(res);
    })();
  }, [date]);
  function handleChange(row, index) {
    setinputEditable(row._id);
    let updatedTodo = {
      ...Attendencedata[index],
      ["empid"]: row.employeeID._id,
      ["_id"]: row._id,
    };

    let newTodos = [...Attendencedata];
    newTodos[index] = updatedTodo;

    setAttendencedata((s) => newTodos);
  }
  function handlesave(index) {
    console.log(Attendencedata[index]);
    updateEmployeeAttendence(Attendencedata[index]);
  }
  return (
    <div className="main-content">
      <section className="section">
        <div className="section-header  d-flex justify-content-between">
          <h1>Admin</h1>
          <NavLink to={``} className="btn btn-primary">
            Edit User
          </NavLink>
        </div>
        <div className="card">
          <div className="card-body row">
            <input
              type="date"
              value={
                new Date(date).getFullYear() +
                "-" +
                (+new Date(date).getMonth() <= 10
                  ? "0" + (new Date(date).getMonth() + 1)
                  : new Date(date).getMonth() + 1) +
                "-" +
                (+new Date(date).getDate() <= 10
                  ? "0" + new Date(date).getDate()
                  : new Date(date).getDate())
              }
              onChange={(e) => setdate(e.target.value)}
            />
          </div>
        </div>
        <div className="card">
          <div className="card-body row">
            <table className="table table2">
              <thead>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    S.No.
                  </th>

                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Emp ID
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Check-in
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Check-out
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Late By
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Overtime
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Remarks
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {EmployeeAttendence.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td style={{ display: "none" }}>
                      <input
                        name="employeeID"
                        value={row.employeeID._id}
                        onChange={(e) => handleChangedata(e, index)}
                      />
                    </td>
                    <td>{row.employeeID.name}</td>
                    <td>
                      <input
                        type="time"
                        value={
                          Attendencedata[index]
                            ? Attendencedata[index]["checkin"]
                            : row.checkin
                        }
                        name="checkin"
                        disabled={inputEditable === row._id ? false : true}
                        onChange={(e) => handleChangedata(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        value={
                          Attendencedata[index]
                            ? Attendencedata[index]["checkout"]
                            : row.checkout
                        }
                        name="checkout"
                        disabled={inputEditable === row._id ? false : true}
                        onChange={(e) => handleChangedata(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={
                          Attendencedata[index]
                            ? Attendencedata[index]["lateby"]
                            : row.lateby
                        }
                        name="lateby"
                        disabled={inputEditable === row._id ? false : true}
                        onChange={(e) => handleChangedata(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={
                          Attendencedata[index]
                            ? Attendencedata[index]["overtiming"]
                            : row.overtiming
                        }
                        name="overtiming"
                        disabled={inputEditable === row._id ? false : true}
                        onChange={(e) => handleChangedata(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={
                          Attendencedata[index]
                            ? Attendencedata[index]["remark"]
                            : row.remark
                        }
                        name="remark"
                        disabled={inputEditable === row._id ? false : true}
                        onChange={(e) => handleChangedata(e, index)}
                      />
                    </td>
                    <td>
                      <button onClick={() => handlesave(index)}>save</button>
                      <button onClick={(e) => handleChange(row, index)}>
                        e
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
export default AttendenceUpload;

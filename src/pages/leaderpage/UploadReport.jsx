import { useEffect, useState } from "react";
import HeaderSection from "../../components/HeaderSection";
import { useSelector } from "react-redux";
import { updateTeamReport, findTeamReport } from "../../http";
const UploadReport = () => {
  const { user } = useSelector((state) => state.authSlice);
  const [date, setDate] = useState(Date.now());
  const [report, setreport] = useState([]);

  const [data, setData] = useState([]);
  function handlechange(e, index) {
    const updatedTodo = {
      ...data[index],
      [e.target.name]: e.target.value,
    };
    const newTodos = [...data];
    newTodos[index] = updatedTodo;
    setData(newTodos);
  }
  async function handleSubmit() {
    const reportdata = {
      id: report._id,
      date: report.date,
      teamReport: data,
    };
    let result = await updateTeamReport(reportdata);
    console.log(result);
  }
  useEffect(() => {
    (async () => {
      let newdate =
        new Date(date).getDate() +
        "/" +
        (new Date(date).getMonth() + 1) +
        "/" +
        new Date(date).getFullYear();
      let result = await findTeamReport({
        empid: user.id,
        date: newdate,
      });
      if (!result.report) {
        setData([]);
      } else {
        setData(result.report.teamReport);
        setreport(result.report);
      }
    })();
  }, [date]);

  return (
    <div className="main-content">
      <section className="section">
        <HeaderSection title="Leaders" />
        <div className="card">
          <div className="card-header">
            <h4>Upload Report</h4>
          </div>
        </div>
        <div className="card-body p-4">
          <div className="table-responsive">
            <table
              style={{ textAlign: "center" }}
              className="table table-striped table-md center-text"
            >
              <thead>
                <tr>
                  <th>
                    date
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      style={{ marginLeft: "10px" }}
                    />
                  </th>
                  <th>
                    team Leader
                    <input
                      type="text"
                      value={user.name}
                      disabled={true}
                      style={{ marginLeft: "10px" }}
                      placeholder="Name"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="2">
                    {/* Inner table with Name and Task */}
                    <table
                      className="table table-striped table-md center-text"
                      border="1"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th>
                            <span>Name</span>
                          </th>
                          <th>
                            <span>Task</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from(data).map((item, index) => (
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td>
                              <textarea
                                style={{ width: "100%" }}
                                name="report"
                                value={item.report}
                                onChange={(e) => handlechange(e, index)}
                              ></textarea>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="card-body row">
            <button
              className="btn btn-primary btn-lg"
              type="submit"
              style={{ width: "30vh" }}
              onClick={handleSubmit}
            >
              Save Report
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UploadReport;

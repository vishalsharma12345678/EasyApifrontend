import { useEffect, useState } from "react";
import HeaderSection from "../../components/HeaderSection";
import { useSelector } from "react-redux";
import { getLeaders, adminfindTeamReport } from "../../http";
const UploadReport = () => {
  const { user } = useSelector((state) => state.authSlice);
  const [date, setDate] = useState(Date.now());
  const [data, setData] = useState([]);
  const [leaders, setleaders] = useState([]);

  async function onChange(e) {
    let newdate =
      new Date(date).getDate() +
      "/" +
      (new Date(date).getMonth() + 1) +
      "/" +
      new Date(date).getFullYear();
    let result = await adminfindTeamReport({
      empid: e.target.value,
      date: newdate,
    });
    console.log(result);
    if (!result.report) {
      setData([]);
    } else {
      setData(result.report.teamReport);
    }
  }
  useEffect(() => {
    (async () => {
      setleaders((s) => []);
      setData((s) => []);
      const leaderdata = await getLeaders();
      setleaders(leaderdata.data);
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
                    <select
                      type="text"
                      value={leaders.id}
                      style={{ marginLeft: "10px" }}
                      onChange={onChange}
                    >
                      <option value="">Na</option>
                      {leaders.map((leader) => (
                        <option value={leader.id}>{leader.name}</option>
                      ))}
                    </select>
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
                                disabled
                                value={item.report}
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
      </section>
    </div>
  );
};

export default UploadReport;

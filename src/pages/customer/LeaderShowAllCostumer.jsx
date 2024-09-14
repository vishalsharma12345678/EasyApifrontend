import { useEffect, useState } from "react";
import HeaderSection from "../../components/HeaderSection";
import { useSelector } from "react-redux";
import { customerRequest, customerupdate, getMembers_Leader } from "../../http";
const LeaderShowCustomer = () => {
  const { user } = useSelector((state) => state.authSlice);
  const [customers, setcustomers] = useState([]);
  const [TeamMemeber, setTeamMemeber] = useState([]);
  async function fetchCustomerdata() {
    const customersdata = await customerRequest();
    setcustomers(customersdata);
  }
  useEffect(() => {
    fetchCustomerdata();
  }, []);
  useEffect(() => {
    (async () => {
      const LeaderTeamdata = await getMembers_Leader();
      console.log(LeaderTeamdata);
      setTeamMemeber(LeaderTeamdata.data);
    })();
  }, []);
  async function handletakeOver(e, id) {
    let data = { Cid: id, empid: e.target.value };
    const updatedata = await customerupdate(data);
    if (updatedata.success) {
      fetchCustomerdata();
    }
  }
  return (
    <>
      <div className="main-content">
        <section className="section">
          <HeaderSection title="Call Request Customer" />
          <div className="card">
            <div className="card-body pr-5 pl-5 m-1">
              <div className="table-responsive">
                <table className="table table-striped table-md center-text">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Applied Date</th>
                      <th>Email</th>
                      <th>M Number</th>
                      <th>Address</th>
                      <th>Message</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="sidebar-wrapper">
                    {customers.map((customer, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{customer.name}</td>
                        <td>{customer.date}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phoneNumber}</td>
                        <td>{customer.address}</td>
                        <td>{customer.message}</td>
                        <td>
                          <select
                            onChange={(e) => handletakeOver(e, customer._id)}
                          >
                            <option value="">Na</option>
                            {TeamMemeber.map((teamMemeber, index) => (
                              <option value={teamMemeber.id}>
                                {teamMemeber.name}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LeaderShowCustomer;

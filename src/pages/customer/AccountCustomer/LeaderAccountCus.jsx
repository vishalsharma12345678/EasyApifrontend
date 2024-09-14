import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  customerupdate,
  leaderteamCustomer,
  getMembers_Leader,
} from "../../../http";
const LeaderAccountCustomer = () => {
  const { user } = useSelector((state) => state.authSlice);
  const [customers, setcustomers] = useState([]);
  const [TeamMemeber, setTeamMemeber] = useState([]);

  useEffect(() => {
    (async () => {
      const LeaderTeamdata = await getMembers_Leader();
      console.log(LeaderTeamdata);
      setTeamMemeber(LeaderTeamdata.data);
    })();
  }, []);
  async function getMembers_LeaderCus() {
    const customersdata = await leaderteamCustomer();
    console.log(customersdata);
    setcustomers(customersdata.data);
  }
  useEffect(() => {
    getMembers_LeaderCus();
  }, []);
  async function handletakeOver(e, id) {
    let data = { Cid: id, empid: e.target.value };
    const updatedata = await customerupdate(data);
    console.log(updatedata);
    getMembers_LeaderCus();
  }
  return (
    <>
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
              <th>Assigned to</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="sidebar-wrapper">
            {Array.from(customers)?.map((customer, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.date}</td>
                <td>{customer.email}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.address}</td>
                <td>{customer.message}</td>
                <td>{customer.takeOverby.name}</td>
                <td>
                  <select onChange={(e) => handletakeOver(e, customer._id)}>
                    <option value="">Na</option>
                    {TeamMemeber?.map((teamMemeber, index) => (
                      <option value={teamMemeber.id}>{teamMemeber.name}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LeaderAccountCustomer;

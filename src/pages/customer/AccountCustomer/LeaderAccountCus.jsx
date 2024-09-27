import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  deletecustomer,
  customerupdate,
  leaderteamCustomer,
  getMembers_Leader,
  messageupdate,
} from "../../../http";
const LeaderAccountCustomer = () => {
  const { user } = useSelector((state) => state.authSlice);
  const [customers, setcustomers] = useState([]);
  const [TeamMemeber, setTeamMemeber] = useState([]);
  const [message, setmessage] = useState("");

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
  async function handledelete(id) {
    const result = await deletecustomer(id);
    console.log(result);
    if (result.success) {
      getMembers_LeaderCus();
      // setLodingstate(false);
    } else {
      // setLodingstate(false);
    }
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
  async function handleupdate(id) {
    const data = { cusid: id, message: message };
    const result = await messageupdate(data);
    if (result.success) {
      window.location.reload();
    }
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
              <th>MC Number</th>
              <th>Mobile Number</th>
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
                <td>{customer.mcnumbers}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.address}</td>
                <td>
                  <textarea
                    rows={5}
                    cols={25}
                    onChange={(e) => setmessage(e.target.value)}
                  >
                    {customer.message}
                  </textarea>
                </td>
                <td>{customer.takeOverby.name}</td>
                <td>
                  <select onChange={(e) => handletakeOver(e, customer._id)}>
                    <option value="">Na</option>
                    {TeamMemeber?.map((teamMemeber, index) => (
                      <option value={teamMemeber.id}>{teamMemeber.name}</option>
                    ))}
                  </select>
                  <button onClick={() => handledelete(customer._id)}>
                    delete
                  </button>
                  <button onClick={() => handleupdate(customer._id)}>
                    update
                  </button>
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

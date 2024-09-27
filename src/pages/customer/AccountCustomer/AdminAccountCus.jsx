import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../components/Loading";

import {
  messageupdate,
  deletecustomer,
  customerupdate,
  AllUsersdata,
  allcustomerAssiged,
} from "../../../http";
const AdminShowCustomer = () => {
  const { user } = useSelector((state) => state.authSlice);
  const [customers, setcustomers] = useState([]);
  const [TeamMemeber, setTeamMemeber] = useState([]);
  const [lodingstate, setLodingstate] = useState(false);
  const [message, setmessage] = useState("");
  async function fetchCustomerdata() {
    const customersdata = await allcustomerAssiged();
    console.log(customersdata);
    setcustomers(customersdata.data);
  }
  useEffect(() => {
    fetchCustomerdata();
  }, []);
  async function leaderteam() {
    const LeaderTeamdata = await AllUsersdata();
    setTeamMemeber(LeaderTeamdata.data);
  }
  useEffect(() => {
    leaderteam();
  }, []);
  async function handletakeOver(e, id) {
    let data = { Cid: id, empid: e.target.value };
    const updatedata = await customerupdate(data);
    if (updatedata.success) {
      fetchCustomerdata();
      leaderteam();
      setLodingstate(false);
    }
  }
  async function handledelete(id) {
    const result = await deletecustomer(id);
    console.log(result);
    if (result.success) {
      fetchCustomerdata();
      leaderteam();
      setLodingstate(false);
    } else {
      setLodingstate(false);
    }
  }
  async function handleupdate(id) {
    // setLodingstate(true);
    const data = { cusid: id, message: message };
    const result = await messageupdate(data);
    if (result.success) {
      window.location.reload();
    }
  }
  return lodingstate ? (
    <Loading />
  ) : (
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
              <th>Take over BY</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="sidebar-wrapper">
            {customers?.map((customer, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.date}</td>
                <td>{customer.email}</td>
                <td>{customer.mcnumbers}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.address}</td>
                <td>{customer.takeOverby.name}</td>
                <td>
                  <textarea
                    rows={5}
                    cols={25}
                    onChange={(e) => setmessage(e.target.value)}
                  >
                    {customer.message}
                  </textarea>
                </td>
                <td>
                  <select onChange={(e) => handletakeOver(e, customer._id)}>
                    <option selected={true} disabled value="">
                      Na
                    </option>
                    {TeamMemeber?.map((teamMemeber, index) => (
                      <option value={teamMemeber._id}>
                        {teamMemeber.name}
                      </option>
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

export default AdminShowCustomer;

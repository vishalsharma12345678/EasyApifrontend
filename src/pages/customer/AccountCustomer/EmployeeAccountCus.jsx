import { useEffect, useState } from "react";
import HeaderSection from "../../../components/HeaderSection";
import { useSelector } from "react-redux";
import {
  deletecustomer,
  messageupdate,
  customerupdate,
  EmployeeCustomer,
} from "../../../http";
const EmployeeAccountCustomer = () => {
  const { user } = useSelector((state) => state.authSlice);
  const [customers, setcustomers] = useState([]);
  const [message, setmessage] = useState("");
  useEffect(() => {
    (async () => {
      const customersdata = await EmployeeCustomer();
      // console.log(customersdata);
      setcustomers(customersdata.data);
    })();
  }, []);
  async function handletakeOver(id) {
    let data = { Cid: id, empid: user.id };
    const updatedata = await customerupdate(data);
    console.log(updatedata);
  }
  async function handledelete(id) {
    const result = await deletecustomer(id);
    console.log(result);
    if (result.success) {
      (async () => {
        const customersdata = await EmployeeCustomer();
        // console.log(customersdata);
        setcustomers(customersdata.data);
      })();
      // setLodingstate(false);
    } else {
      // setLodingstate(false);
    }
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
                  <button
                    className="btn btn-primary btn-sm"
                    type="submit"
                    style={{ width: "10vh" }}
                    onClick={(e) => handletakeOver(customer._id)}
                  >
                    Take Over
                  </button>
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

export default EmployeeAccountCustomer;

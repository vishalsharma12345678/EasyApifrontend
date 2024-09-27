import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import AdminAccountCustomer from "./AccountCustomer/AdminAccountCus";
import LeaderAccountCustomer from "./AccountCustomer/LeaderAccountCus";
import EmployeeAccountCustomer from "./AccountCustomer/EmployeeAccountCus";
import { instrestedcustomer } from "../../http";
import Modal from "../../components/modal/Modal";
import { useState } from "react";
const ShowMyAccountCus = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [address, setaddress] = useState("");
  const [message, setmessage] = useState("");
  const [mcNumber, setmcNumber] = useState("");
  const { user } = useSelector((state) => state.authSlice);
  const [showModal, setShowModal] = useState(false);
  const handleclick = async (e) => {
    const data = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      message: message,
      mcNumber: mcNumber,
    };
    const result = await instrestedcustomer(data);
    setShowModal(showModal ? false : true);
    window.location.reload(true);
  };
  const modalAction = () => {
    setShowModal(showModal ? false : true);
  };
  const handletoggle = () => {
    if (!showModal) return setShowModal(true);
  };
  return (
    <>
      <div className="main-content">
        <section className="section">
          <div className="section-header  d-flex justify-content-between">
            <h1>My Account Customer</h1>
            <button onClick={handletoggle} className="btn btn-primary">
              Add Potential Cus
            </button>
          </div>
          <div className="card">
            <div className="card-body pr-5 pl-5 m-1">
              <>
                {showModal && (
                  <Modal close={modalAction} title="Update User" width="35%">
                    <div className="row" style={{ margin: "20px" }}>
                      <div className="col ">
                        <table className="table table-md">
                          <tr>
                            <th>Name</th>
                            <br />
                            <td>
                              <input
                                style={{ width: "100%" }}
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th>Email</th>
                            <br />
                            <td>
                              <input
                                style={{ width: "100%" }}
                                type="email"
                                value={email}
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th>MC Number</th>
                            <br />
                            <td>
                              <input
                                style={{ width: "100%" }}
                                type="text"
                                value={mcNumber}
                                placeholder="MC number"
                                onChange={(e) => setmcNumber(e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th>Mobile Number</th>
                            <br />
                            <td>
                              <input
                                style={{ width: "100%" }}
                                type="number"
                                value={phoneNumber}
                                placeholder="Phone Number"
                                onChange={(e) => setphoneNumber(e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th>Address</th>
                            <br />
                            <td>
                              <input
                                style={{ width: "100%" }}
                                type="text"
                                value={address}
                                placeholder="Address"
                                onChange={(e) => setaddress(e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th>Message</th>
                            <br />
                            <br />
                            <td>
                              <textarea
                                style={{ width: "100%" }}
                                name="message"
                                value={message}
                                onChange={(e) => setmessage(e.target.value)}
                              ></textarea>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <div className="justify-content-center text-center mb-3">
                      <button
                        className="btn btn-primary btn-lg"
                        type="submit"
                        onClick={handleclick}
                        form="updateUserForm"
                        style={{ width: "30vh" }}
                      >
                        Add Customer
                      </button>
                    </div>
                  </Modal>
                )}
                {user.type === "Admin" ? (
                  <AdminAccountCustomer />
                ) : user.type === "Leader" ? (
                  <LeaderAccountCustomer />
                ) : (
                  <EmployeeAccountCustomer />
                )}
              </>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ShowMyAccountCus;

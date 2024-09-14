import { useEffect, useState } from "react";
import HeaderSection from "../../components/HeaderSection";
import { useSelector } from "react-redux";
import { customerRequest, customerupdate } from "../../http";
const ShowCustomer = () => {
  const { user } = useSelector((state) => state.authSlice);
  const [customers, setcustomers] = useState([]);
  useEffect(() => {
    (async () => {
      const customersdata = await customerRequest();
      setcustomers(customersdata);
    })();
  }, []);
  async function handletakeOver(id) {
    let data = { Cid: id, empid: user.id };
    const updatedata = await customerupdate(data);
    console.log(updatedata);
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
                          <button
                            className="btn btn-primary btn-sm"
                            type="submit"
                            style={{ width: "10vh" }}
                            onClick={(e) => handletakeOver(customer._id)}
                          >
                            Take Over
                          </button>
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

export default ShowCustomer;

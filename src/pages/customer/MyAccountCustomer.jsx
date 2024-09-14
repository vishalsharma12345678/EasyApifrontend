import React from "react";
import { useSelector } from "react-redux";
import AdminAccountCustomer from "./AccountCustomer/AdminAccountCus";
import LeaderAccountCustomer from "./AccountCustomer/LeaderAccountCus";
import EmployeeAccountCustomer from "./AccountCustomer/EmployeeAccountCus";
import HeaderSection from "../../components/HeaderSection";

const ShowMyAccountCus = () => {
  const { user } = useSelector((state) => state.authSlice);

  return (
    <>
      <div className="main-content">
        <section className="section">
          <HeaderSection title="My Account Customer" />
          <div className="card">
            <div className="card-body pr-5 pl-5 m-1">
              <>
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

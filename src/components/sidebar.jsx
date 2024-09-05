import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Admin from "./Navigation/Admin";
import Leader from "./Navigation/Leader";
import Employee from "./Navigation/Employee";
import "../assets/css/sidebar.css";
const SideBar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authSlice);
  const { collapsed } = useSelector((state) => state.sidebar);

  return (
    <div className={`main-sidebar ${collapsed ? "collapsed" : ""}`}>
      <aside id="sidebar-wrapper">
        <div className="sidebar-brand">
          <NavLink to="/home">Target Management</NavLink>
        </div>
        <div className="sidebar-brand sidebar-brand-sm">
          <NavLink to="/home">TM</NavLink>
        </div>
        {user.type === "Admin" ? (
          <Admin />
        ) : user.type === "Leader" ? (
          <Leader />
        ) : (
          <Employee />
        )}
      </aside>
    </div>
  );
};

export default SideBar;

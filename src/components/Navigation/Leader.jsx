import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { toggleSidebar } from "../../action/sidebarAction";
const Leader = () => {
  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(toggleSidebar());
  };
  return (
    <ul className="sidebar-menu">
      <li onClick={handleToggle}>
        <NavLink className="nav-link" to="/home">
          <i className="fas fa-fire"></i> <span>Dashboard</span>
        </NavLink>
      </li>
      <li onClick={handleToggle}>
        <NavLink className="nav-link" to="/members">
          <i className="fas fa-fire"></i> <span>Members</span>
        </NavLink>
      </li>
      <li onClick={handleToggle}>
        <NavLink className="nav-link" to="/uploadReport">
          <i className="fas fa-fire"></i> <span>Upload Report</span>
        </NavLink>
      </li>

      <li onClick={handleToggle}>
        <NavLink className="nav-link" to="/userAttendance">
          <i className="fas fa-user"></i> <span>Attendance</span>
        </NavLink>
      </li>
      <li onClick={handleToggle}>
        <NavLink className="nav-link" to="/applyforleave">
          <i className="fas fa-pen"></i> <span>Apply For Leave</span>
        </NavLink>
      </li>
      <li onClick={handleToggle}>
        <NavLink className="nav-link" to="/userLeaveApplications">
          <i className="fas fa-book"></i> <span>Leave Applications</span>
        </NavLink>
      </li>
      <li onClick={handleToggle}>
        <NavLink className="nav-link" to="/userSalary">
          <i class="fas fa-piggy-bank"></i> <span>Salary</span>
        </NavLink>
      </li>
      <li onClick={handleToggle}>
        <NavLink className="nav-link" to="/LeadershowCustomer">
          <i className="fas fa-fire"></i> <span>Show customer</span>
        </NavLink>
      </li>
      <li onClick={handleToggle}>
        <NavLink className="nav-link" to="/MyAccountCustomer">
          <i className="fas fa-user"></i> <span>My Account Cus</span>
        </NavLink>
      </li>

      <li className="menu-header">Settings</li>

      <li onClick={handleToggle}>
        <NavLink className="nav-link" to="/home">
          <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default Leader;

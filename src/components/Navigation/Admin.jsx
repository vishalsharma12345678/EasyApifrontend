import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { toggleSidebar } from "../../action/sidebarAction";
const Admin = () => {
  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(toggleSidebar());
  };
  return (
    <ul className="sidebar-menu">
      <li onClick={handleToggle}>
        <NavLink className="nav-link" to="/home">
          <i className="fas fa-home"></i> <span>Dashboard</span>
        </NavLink>
      </li>
      <li onClick={handleToggle}>
        <NavLink className="nav-link" to="/employees">
          <i className="fas fa-users"></i> <span>Employees</span>
        </NavLink>
      </li>
      <li onClick={handleToggle}>
        <NavLink className="nav-link" to="/leaders">
          <i className="fas fa-user-friends"></i> <span>Leaders</span>
        </NavLink>
      </li>
      <li onClick={handleToggle}>
        <NavLink className="nav-link" to="/admins">
          <i className="fas fa-users-cog"></i> <span>Admins</span>
        </NavLink>
      </li>
      <li onClick={handleToggle}>
        <NavLink className="nav-link" to="/teams">
          <i className="fas fa-fire"></i> <span>Teams</span>
        </NavLink>
      </li>
      <li onClick={handleToggle}>
        <NavLink className="nav-link" to="/attendance">
          <i className="fas fa-user"></i> <span>Attendance</span>
        </NavLink>
      </li>
      <li onClick={handleToggle}>
        <NavLink className="nav-link" to="/ShowReport">
          <i className="fas fa-fire"></i> <span>Show Report</span>
        </NavLink>
      </li>
      <li onClick={handleToggle}>
        <NavLink className="nav-link" to="/attendenceUpload">
          <i className="fas fa-user"></i> <span>Upload Attendence</span>
        </NavLink>
      </li>
      <li onClick={handleToggle}>
        <NavLink className="nav-link" to="/leaves">
          <i className="fas fa-book"></i>
          <span>Leaves</span>
        </NavLink>
      </li>
      <li onClick={handleToggle}>
        <NavLink className="nav-link" to="/assignSalary">
          <i class="fas fa-pen"></i> <span>Assign Salary</span>
        </NavLink>
      </li>
      <li onClick={handleToggle}>
        <NavLink className="nav-link" to="/salaries">
          <i class="fas fa-piggy-bank"></i> <span>Salaries</span>
        </NavLink>
      </li>

      <li className="menu-header">Starter</li>
      <li onClick={handleToggle}>
        <NavLink className="nav-link" to="/adduser">
          <i className="fas fa-user-plus"></i> <span>Add User</span>
        </NavLink>
      </li>
      <li onClick={handleToggle}>
        <NavLink className="nav-link" to="/addteam">
          <i className="fas fa-address-card"></i> <span>Add Team</span>
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

export default Admin;

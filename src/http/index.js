import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: `http://localhost:5500/api`,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});
// 'http://localhost:5500/api'
// https://easyapibackend-elwu.onrender.com/api
//Auth
export const doLogin = (data) => api.post("/auth/login", data);
export const forgotPassword = (data) => api.post("/auth/forgot", data);
export const resetPassword = (data) => api.patch("/auth/reset", data);
export const dLogout = () => api.get("/auth/logout");

//Admin
export const getEmployeeAttendence = async (data) => {
  const l = api.post("/admin/attendencefind", data);
  return l;
};
export const getOneEmployeeAttendence = async (data) => {
  const l = api.post("/admin/oneEmpattendence", data);
  return l;
};
export const getOnnEmployeeLeaderAttendence = async (data) => {
  const l = api.post("/employee/oneEmpattendence", data);
  return l;
};
export const updateEmployeeAttendence = async (data) => {
  const l = api.post("/admin/attendenceUpdate", data);
  return l;
};
export const createTeamReport = async (data) => {
  const l = api.post("/leader/team/createReport", data);
  return l;
};
export const findTeamReport = async (data) => {
  console.log(data);
  const l = api.post("/leader/team/findReport", data);
  return l;
};
export const customerRequest = async () => {
  const l = api.get("/common/customer/record");
  return l;
};
export const instrestedcustomer = async (data) => {
  console.log(data);
  const l = api.post("/common/customer/record/interstedemplyee", data);
  return l;
};
export const allcustomerAssiged = () => api.get("/admin/allcustomerAssiged");

export const customerupdate = async (data) => {
  console.log(data);
  const l = api.post("/common/customer/record/update", data);
  return l;
};
export const deletecustomer = (data) =>
  api.get(`/common/customer/record/deletecustomer/${data}`);
export const messageupdate = async (data) => {
  console.log(data);
  const l = api.post("/common/customer/record/updatemessage", data);
  return l;
};
export const adminfindTeamReport = async (data) => {
  console.log(data);
  const l = api.post("/admin/team/findReport", data);
  return l;
};
export const updateTeamReport = async (data) => {
  const l = api.post("/leader/team/updateReport", data);
  return l;
};
export const AllUsersdata = async () => {
  const data = api.get("/admin/alluserdata");
  return data;
};
//
export const leaderteamCustomer = () =>
  api.get("/leader/team/members/customer");
export const EmployeeCustomer = () => api.get("/employee/getownCustomer");
export const getCounts = () => api.get("/admin/counts");
export const getEmployees = () => api.get("/admin/employees");
export const getLeaders = () => api.get("/admin/leaders");
export const getFreeLeaders = () => api.get("/admin/leaders/free");
export const getAdmins = () => api.get("/admin/admins");
export const getTeams = () => api.get("/admin/teams");

export const getTeamMembers = (data) => api.get(`/admin/team/${data}/members`);
export const addUser = (data) => api.post("/admin/user", data);
export const updateUser = (id, data) => api.patch(`/admin/user/${id}`, data);
export const addTeam = (data) => api.post("/admin/team", data);
export const updateTeam = (id, data) => api.post(`/admin/team/${id}`, data);
export const getEmployee = (data) => api.get(`/admin/employee/${data}`);
export const getLeader = (data) => api.get(`/admin/leader/${data}`);
export const getFreeEmployees = () => api.get("/admin/employees/free");
export const getTeam = (data) => api.get(`/admin/team/${data}`);
export const removeMember = (data) =>
  api.patch("/admin/team/member/remove", data);
export const addMember = (data) => api.patch("/admin/team/member/add", data);
export const removeLeader = (data) =>
  api.patch("/admin/team/leader/remove", data);
export const addLeader = (data) => api.patch("/admin/team/leader/add", data);
export const getUser = (data) => api.get(`/admin/user/${data}`);
export const getAttendance = (data) =>
  api.post("admin/view-employee-attendance", data);
export const viewLeaves = (data) =>
  api.post("admin/view-leave-applications", data);
export const updateLeave = (id, data) =>
  api.post(`admin/update-leave/${id}`, data);
export const assignSalary = (data) =>
  api.post("admin/assign-employee-salary", data);
export const updateSalary = (data) =>
  api.post("admin/update-employee-salary", data);
export const viewAllSalaries = (data) =>
  api.post("admin/view-all-salary", data);

//Leader
export const getMembers_Leader = () => api.get("/leader/team/members");
export const getTeam_Leader = () => api.get("/leader/team/");

// Employee
export const getEmployeeTeam = (data) => api.get(`/employee/team/${data}`);
export const getEmployeeTeamMembers = (data) =>
  api.get(`/employee/team/${data}/members`);
export const markEmployeeAttendance = (data) =>
  api.post("/employee/mark-employee-attendance", data);
export const viewEmployeeAttendance = (data) =>
  api.post("/employee/view-employee-attendance", data);
export const applyforleave = (data) =>
  api.post("/employee/apply-leave-application", data);
export const viewLeaveApplications = (data) =>
  api.post("/employee/view-leave-applications", data);
export const viewEmployeeSalary = (data) =>
  api.post("employee/view-salary", data);
api.interceptors.response.use(
  (response) => {
    console.log("All Cookies", response.cookie);
    return response.data;
  },
  (error) => {
    console.log(error);
    return error.response.data;
  }
);

export default api;

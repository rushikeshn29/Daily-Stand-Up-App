import axios from "axios";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "user"
)}`;

const deleteUpdate = (id) => {
  return axios.delete(
    `${process.env.REACT_APP_API_URL}user/deleteUpdates/${id}`
  );
};
const getTeamMembers = (id) => {
  return axios.get(`${process.env.REACT_APP_API_URL}user/getEmployees/${id}`);
};

const exportExcel = (id) => {
  return axios.get(`${process.env.REACT_APP_API_URL}user/export/${id}`);
};
const getEmployeeDetailsById = (id) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}user/getEmployeeDetails/${id}`
  );
};

const addUserUpdates = (id1, id2, data) => {
  return axios.post(
    `${process.env.REACT_APP_API_URL}user/addUpdates/${id1}/${id2}`,
    data
  );
};

const updateUserUpdates = (id, data) => {
  return axios.put(
    `${process.env.REACT_APP_API_URL}user/updateUpdates/${id}`,
    data
  );
};

const getUserUpdates = (id) => {
  return axios.get(`${process.env.REACT_APP_API_URL}user/getUserData/${id}`);
};

const getUpdatesOfWeek = (id) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}user/getWeeksUpdates/${id}`
  );
};

const getEmployeeUpdates = (id) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}user/getTodaysUpdates/${id}`
  );
};

export {
  exportExcel,
  getTeamMembers,
  getEmployeeDetailsById,
  addUserUpdates,
  getUpdatesOfWeek,
  updateUserUpdates,
  getUserUpdates,
  getEmployeeUpdates,
  deleteUpdate,
};

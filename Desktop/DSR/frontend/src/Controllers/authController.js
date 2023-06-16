import axios from "axios";

const loginUser = (data) => {
  return axios.post(`${process.env.REACT_APP_API_URL}auth/login`, data);
};

const registerUser = (data) => {
  return axios.post(`${process.env.REACT_APP_API_URL}auth/register`, data);
};

const getTeamLead = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}auth/getTeamLead`);
};

export { loginUser, registerUser, getTeamLead };

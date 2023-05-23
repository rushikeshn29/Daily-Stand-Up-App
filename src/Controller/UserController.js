import axios from "axios";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  'user'
)}`
console.log(localStorage.getItem('user'));


const addEditPaper = (finalData, pId) => {
  return pId
    ? axios.put(
        `${process.env.REACT_APP_API_URL}user/updatepaper/${pId}`,
        finalData
      )
    : axios.post(`${process.env.REACT_APP_API_URL}user/addpaper`, finalData);
};
const getUserPaper = (id) => {
  return axios.get(`${process.env.REACT_APP_API_URL}user/getpaper/${id}`);
};
const getPaperBySubject = (id, subject) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}user/paperbysubject/${id}?subject=${subject}`
  );
};
const paperById = (id) => {
  return axios.get(`${process.env.REACT_APP_API_URL}user/getpaperbyid/${id}`);
};
const deletePaper = (id) => {
  return axios.put(`${process.env.REACT_APP_API_URL}user/deletePaper/${id}`);
};
const getStatistics = (id, data) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}user/paperbymonth/${id}?year=${data}`
  );
};

export {
  addEditPaper,
  getUserPaper,
  getPaperBySubject,
  paperById,
  deletePaper,
  getStatistics,
};

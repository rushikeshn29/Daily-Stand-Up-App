import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { useParams } from "react-router";
import Navbar from "../../Components/Header/Navbar";
import { getUpdatesOfWeek } from "../../Controllers/userController";
import UserProfileCard from "../../Components/Details/UserProfileCard";
import UpdateEmployeeForm from "../../Components/Details/UpdateEmployeeForm";
import EmployeeUpdateTable from "../../Components/Details/EmployeeUpdateTable";

export default function UpdateReport() {
  const employeeId = useParams();

  // States
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTableData = () => {
    getUpdatesOfWeek(employeeId.id)
      .then((res) => {
        setTableData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching table data:", error);
      });
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div style={{ marginTop: 50 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <UserProfileCard />
              </Grid>
              <Grid item xs={8}>
                <UpdateEmployeeForm fetchTableData={fetchTableData} />
              </Grid>
              <Grid item xs={12}>
                <EmployeeUpdateTable tableData={tableData} />
              </Grid>
            </Grid>
          </div>
        </Box>
      </Box>
    </>
  );
}

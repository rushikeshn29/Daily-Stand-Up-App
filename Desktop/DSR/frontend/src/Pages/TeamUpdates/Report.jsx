import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Header/Navbar";
import { Grid } from "@mui/material";
import UserProfileCard from "../../Components/Details/UserProfileCard";
import EmployeeForm from "../../Components/Details/EmployeeForm";
import EmployeeUpdateTable from "../../Components/Details/EmployeeUpdateTable";
import { getUpdatesOfWeek } from "../../Controllers/userController";
import { useParams } from "react-router";

export default function Report() {
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
                <EmployeeForm fetchTableData={fetchTableData} />
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

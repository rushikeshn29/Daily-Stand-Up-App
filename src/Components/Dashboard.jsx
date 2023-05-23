import { Box } from "@mui/system";
import React from "react";
import Navbar from "./Navbar";

export default function Dashboard() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div style={{ marginTop: 50 }}>
            <h1>Dashboard</h1>
          </div>
        </Box>
      </Box>
    </>
  );
}

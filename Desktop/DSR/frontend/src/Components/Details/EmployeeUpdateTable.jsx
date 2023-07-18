import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import "../../Styles/details.css";
import dateformat from "../../Utils/Common";
import VisibilityIcon from "@mui/icons-material/Visibility";

const EmployeeUpdateTable = ({ tableData }) => {

  // States
  const [open, setOpen] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState("");

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const handleViewClick = (update) => {
    setSelectedUpdate(update);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <TableContainer component={Paper} className="tableContainer1">
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow className="tableRow">
              <TableCell className="tableCell">Date</TableCell>
              <TableCell className="tableCell">Attendance</TableCell>
              <TableCell className="tableCell">Working Status</TableCell>
              <TableCell className="tableCell">Working From</TableCell>
              <TableCell className="tableCell">
                Working On Client Name
              </TableCell>
              <TableCell className="tableCell">Today's Update</TableCell>
              <TableCell className="tableCell">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.length > 0 ? (
              tableData?.map((row, index) => (
                <TableRow
                  key={row._id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#fef8f8" : "#ffffff",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                  }}
                  hover
                  onMouseEnter={(event) => {
                    event.currentTarget.style.backgroundColor = "#fbf3ff";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.backgroundColor =
                      index % 2 === 0 ? "#fef8f8" : "#ffffff";
                  }}
                >
                  <TableCell>{dateformat(row.createdAt)}</TableCell>
                  <TableCell>{row.attendance}</TableCell>
                  <TableCell>{row.workingStatus.split("-")[0]}</TableCell>
                  <TableCell>{row.workingFrom}</TableCell>
                  <TableCell>
                    {row.workingStatus.split("-")[0] === "Bench"
                      ? row.workingStatus.split("-")[0]
                      : row.workingStatus.split("-")[1]}
                  </TableCell>
                  <TableCell>
                    {row.updates ? (
                      truncateText(row.updates, 15)
                    ) : (
                      <span>No updates</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {row.updates && (
                      <Tooltip title="View" arrow>
                        <VisibilityIcon
                          onClick={() => handleViewClick(row.updates)}
                        />
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableCell align="center" colSpan={8}>
                <span className="nodataFound">No Data Found</span>
              </TableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ minWidth: "400px", minHeight: "400px" }}
        fullWidth
      >
        <DialogTitle>View Updates</DialogTitle>
        <DialogContent>
          <DialogContentText>{selectedUpdate}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeUpdateTable;

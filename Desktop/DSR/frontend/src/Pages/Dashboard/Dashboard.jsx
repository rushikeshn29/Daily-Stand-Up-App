import xlsx from "json-as-xlsx";
import { Box } from "@mui/system";
import jwtdecode from "jwt-decode";
import "../../Styles/dashboard.css";
import { styled } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";
import SendIcon from "@mui/icons-material/Send";
import Container from "@mui/material/Container";
import Modal from "../../Components/Modal/Modal";
import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Header/Navbar";
import { useNavigate } from "react-router-dom/dist";
import { toast, ToastContainer } from "react-toastify";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Button,
  Grid,
  Card,
  Avatar,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  exportExcel,
  getUserUpdates,
  getTeamMembers,
  deleteUpdate,
} from "../../Controllers/userController";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("user")
    ? jwtdecode(localStorage.getItem("user"))
    : "";
  const id = token.userID;

  // States
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamUpdates, setTeamUpdates] = useState([]);

  useEffect(() => {
    getTeamDetails();
    getTeamUpdates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTeamDetails = async () => {
    const res = await getTeamMembers(id);
    setTeamMembers(res.data.data);
  };
  const getTeamUpdates = async () => {
    const res = await exportExcel(id);
    setTeamUpdates(res.data.data);
  };
  const handleModal = async (memberId) => {
    const res = await getUserUpdates(memberId);
    setUpdate(res.data.data[0]);
    setOpen(true);
  };

  const CARD_PROPERTY = {
    cursor: "pointer",
    borderRadius: 3,
    boxShadow: 2,
  };

  const handleDelete = (updateId) => {
    deleteUpdate(updateId)
      .then((response) => {
        if (Number(response.data.status) === 1) {
          toast.success(response.data.message);
          getTeamUpdates();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong ! Please Try again later..");
      });
  };

  const handleExcel = async () => {
    let data = [
      {
        columns: [
          {
            label: "First Name",
            value: "firstName",
          },
          {
            label: "Last Name",
            value: "lastName",
          },
          {
            label: "Attendence",
            value: "attendance",
          },
          {
            label: "Days Present In Call",
            value: "daysPresentInCall",
          },
          {
            label: "Working On",
            value: "workingStatus",
          },
          {
            label: "Updates",
            value: "updates",
          },
          {
            label: "Working From",
            value: "workingFrom",
          },
        ],
        content: teamUpdates,
      },
    ];

    let objectDate = new Date();
    let day = objectDate.getDate();
    let month = objectDate.getMonth();
    let year = objectDate.getFullYear();
    let settings = {
      fileName: `DSR_${day + "-" + month + "-" + year}`,
    };

    xlsx(data, settings);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: "100%" }}>
          <div style={{ marginTop: 50 }}>
            <h1>Dashboard</h1>
            <Container maxWidth="xl">
              <Grid container spacing={1}>
                <Grid sx={{ gridTemplateRows: "repeat(4, 1fr)" }}>
                  {teamMembers.length > 0 ? (
                    teamMembers?.map((member) => {
                      return (
                        <Card
                          key={member._id}
                          sx={CARD_PROPERTY}
                          className="card"
                          onClick={(e) => handleModal(member._id)}
                        >
                          <Box
                            sx={{
                              pl: 1,
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Avatar
                                sx={{ width: 50, height: 50, mr: 2 }}
                                src={member.profileImage}
                              ></Avatar>
                              <Box>
                                <h4>
                                  {" "}
                                  {member.firstName}
                                  {""} {member.lastName} <br />{" "}
                                  <span style={{ fontSize: 11 }}>
                                    {member.department}
                                  </span>{" "}
                                </h4>
                              </Box>
                            </Box>
                            <EditOutlinedIcon
                              sx={{ mr: 1 }}
                              onClick={(e) => {
                                navigate(`report/${member._id}`);
                              }}
                            />
                          </Box>
                        </Card>
                      );
                    })
                  ) : (
                    <center>
                      <h3 style={{}}>No Members Yet</h3>
                    </center>
                  )}
                </Grid>
                <br />

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">
                          Serial No.
                        </StyledTableCell>
                        <StyledTableCell align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">
                          Attendence
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Days Present in Stand up Call
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Working On
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Today's Update
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Working From
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {" "}
                          Actions
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {teamUpdates.length > 0 ? (
                        teamUpdates?.map((employee, i) => {
                          return (
                            <StyledTableRow
                              key={employee._id}>
                              <StyledTableCell align="center">
                                {i + 1}
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {employee.firstName} {employee.lastName}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {employee.attendance}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {employee.daysPresentInCall}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {employee.workingStatus}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {employee.updates}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {employee.workingFrom}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <DeleteOutlinedIcon
                                  sx={{ cursor: "pointer", p: "3px" }}
                                  onClick={(e) => {
                                    handleDelete(employee.updateId);
                                  }}
                                />
                                <EditOutlinedIcon
                                  sx={{ cursor: "pointer", p: "3px" }}
                                  onClick={(e) => {
                                    navigate(
                                      `updateUpdates/${employee.userId}`
                                    );
                                  }}
                                />
                              </StyledTableCell>
                            </StyledTableRow>
                          );
                        })
                      ) : (
                        <StyledTableRow>
                          <StyledTableCell align="center" colSpan={8}>
                            <span>No Data Found</span>
                          </StyledTableCell>
                        </StyledTableRow>
                      )}
                    </TableBody>

                  </Table>
                </TableContainer>

                <div>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ mt: 1, mr: 1 }}
                    endIcon={<SendIcon />}
                    onClick={(e) => {
                      window.location = `mailto:max.mustermann@example.com?Cc=${teamMembers?.map(
                        (member) => {
                          return member.email + ",";
                        }
                      )}rishi@gm.com&Subject=Daily Stand Up Report&body=My custom mail body`;
                    }}
                  >
                    share
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ mt: 1 }}
                    endIcon={<SendIcon />}
                    onClick={(e) => {
                      handleExcel();
                    }}
                  >
                    Excel
                  </Button>
                </div>
              </Grid>
            </Container>
          </div>
        </Box>
      </Box>

      <Modal
        open={open}
        close={() => {
          setOpen(false);
        }}
        update={update}
      />
      <ToastContainer />
    </>
  );
}

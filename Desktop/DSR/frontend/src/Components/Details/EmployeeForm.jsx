import { useFormik } from "formik";
import "../../Styles/details.css";
import jwtDecode from "jwt-decode";
import { useParams } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import { DEFAULT_TL_ID } from "../../Utils/Constants";
import { ToastContainer, toast } from "react-toastify";
import { employeeValidationSchema } from "../../Validation/ValidationRules";
import {
  addUserUpdates,
  getUserUpdates,
} from "../../Controllers/userController";
import {
  Grid,
  TextField,
  FormControl,
  MenuItem,
  Button,
  Card,
  Typography,
} from "@mui/material";

const EmployeeForm = ({ fetchTableData }) => {
  const { id } = useParams();
  const token = localStorage.getItem("user")
    ? jwtDecode(localStorage.getItem("user"))
    : "";
  const teamLeadId = token.Tl === DEFAULT_TL_ID ? token.userID : token.Tl;
  // const [formErrors, setFormErrors] = useState({});

  // States
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    reportData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reportData = async (id) => {
    const res = await getUserUpdates(id);

    if (res.data.data.length > 0) {
      formik.setFieldValue(
        "workingStatus",
        res.data.data[0].workingStatus.split("-")[0]
      );
      formik.setFieldValue(
        "workingOnClientName",
        res.data.data[0].workingStatus.split("-")[1]
      );
      formik.setFieldValue("attendance", res.data.data[0].attendance);
      formik.setFieldValue("updates", res.data.data[0].updates);
      formik.setFieldValue("workingFrom", res.data.data[0].workingFrom);

      setIsSaved(true);
    }
  };

  const formik = useFormik({
    initialValues: {
      workingStatus: "",
      attendance: "",
      updates: "",
      workingFrom: "",
      workingOnClientName: "",
    },
    validationSchema: employeeValidationSchema,
    onSubmit: (values) => {
      setIsSaving(true);
      handleOnSubmit(values);
    },
  });

  const handleOnSubmit = (values) => {
    if (values.workingStatus === "Bench") {
      values.workingOnClientName = "";
    }

    addUserUpdates(id, teamLeadId, values)
      .then((res) => {
        // setFormErrors({});

        if (Number(res.data.status) === 1) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
        setIsSaved(true);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsSaving(false);
        formik.setTouched({
          workingStatus: true,
          attendance: true,
          workingFrom: true,
          workingOnClientName: true,
          updates: true,
        });
        fetchTableData();
      });
  };

  const handleChange = (e) => {
    formik.handleChange(e);
  };

  return (
    <Card className="employeeFormcard">
      <form onSubmit={formik.handleSubmit}>
        <Grid item xs={12} style={{ paddingBottom: 20 }}></Grid>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl
              fullWidth
              error={
                formik.touched.workingStatus && formik.errors.workingStatus
              }
            >
              <TextField
                id="outlined-multiline-static"
                label="Working Status"
                fullWidth
                value={formik.values.workingStatus}
                name="workingStatus"
                select
                onChange={handleChange}
                disabled={isSaved}
              >
                <MenuItem value="" disabled>
                  Select status
                </MenuItem>
                <MenuItem value="Bench">Bench</MenuItem>
                <MenuItem value="Client">Client</MenuItem>
                <MenuItem value="Shadow">Shadow</MenuItem>
              </TextField>
              {formik.touched.workingStatus && formik.errors.workingStatus && (
                <span
                  className="error"
                  style={{ color: "red", fontSize: "12px" }}
                >
                  {formik.errors.workingStatus}
                </span>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl
              fullWidth
              error={formik.touched.attendance && formik.errors.attendance}
            >
              <TextField
                id="outlined-multiline-static"
                label="Attendance"
                fullWidth
                value={formik.values.attendance}
                name="attendance"
                select
                onChange={handleChange}
                disabled={isSaved}
              >
                <MenuItem value="" disabled>
                  Select attendance
                </MenuItem>
                <MenuItem value="Present">Present</MenuItem>
                <MenuItem value="Absent">Absent</MenuItem>
              </TextField>
              {formik.touched.attendance && formik.errors.attendance && (
                <span
                  className="error"
                  style={{ color: "red", fontSize: "12px" }}
                >
                  {formik.errors.attendance}
                </span>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl
              fullWidth
              error={formik.touched.workingFrom && formik.errors.workingFrom}
            >
              <TextField
                id="outlined-multiline-static"
                label="Working From"
                fullWidth
                select
                value={formik.values.workingFrom}
                name="workingFrom"
                onChange={handleChange}
                disabled={isSaved}
              >
                <MenuItem value="" disabled>
                  Select
                </MenuItem>
                <MenuItem value="Home">Home</MenuItem>
                <MenuItem value="Office">Office</MenuItem>
                <MenuItem value="Client Office">Client Office</MenuItem>
              </TextField>
              {formik.touched.workingFrom && formik.errors.workingFrom && (
                <span
                  className="error"
                  style={{ color: "red", fontSize: "12px" }}
                >
                  {formik.errors.workingFrom}
                </span>
              )}
            </FormControl>
          </Grid>

          {formik.values.workingStatus === "Client" ||
            formik.values.workingStatus === "Shadow" ? (
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                fullWidth
                label="Working On Client Name"
                multiline
                value={formik.values.workingOnClientName}
                name="workingOnClientName"
                onChange={handleChange}
                disabled={isSaved}
              />
              {formik.touched.workingOnClientName &&
                formik.errors.workingOnClientName && (
                  <span
                    className="error"
                    style={{ color: "red", fontSize: "12px" }}
                  >
                    {formik.errors.workingOnClientName}
                  </span>
                )}
            </Grid>
          ) : null}

          {formik.values.attendance === "Present" && (
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                fullWidth
                label="Today's Update"
                multiline
                rows={3.5}
                value={formik.values.updates}
                name="updates"
                onChange={handleChange}
                disabled={isSaved}
              />
              {formik.touched.updates && formik.errors.updates && (
                <span
                  className="error"
                  style={{ color: "red", fontSize: "12px" }}
                >
                  {formik.errors.updates}
                </span>
              )}
            </Grid>
          )}

          {isSaved ? (
            <Typography
              variant="body1"
              style={{ margin: "10px 0", color: "green" }}
            >
              Details have been saved.
            </Typography>
          ) : (
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="justify-content-end"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </Grid>
          )}
        </Grid>
      </form>
      <ToastContainer />
    </Card>
  );
};

export default EmployeeForm;

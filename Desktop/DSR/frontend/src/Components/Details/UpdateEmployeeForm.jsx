import {
  Grid,
  TextField,
  FormControl,
  MenuItem,
  Button,
  Card,
} from "@mui/material";
import "../../Styles/details.css";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { employeeValidationSchema } from "../../Validation/ValidationRules";
import {
  getUserUpdates,
  updateUserUpdates,
} from "../../Controllers/userController";

const UpdateEmployeeForm = ({ fetchTableData }) => {
  const { id } = useParams();
  // const [formErrors, setFormErrors] = useState({});

  // States
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await getUserUpdates(id)
        .then((res) => {
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

          setUserData(res.data.data[0]);
        })
        .catch((error) => {
          console.log("Error occurred:", error);
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const formik = useFormik({
    initialValues: {
      workingStatus: userData.workingStatus || "",
      attendance: userData.attendance || "",
      updates: userData.updates || "",
      workingFrom: userData.workingFrom || "",
      workingOnClientName: userData.workingOnClientName || "",
    },
    validationSchema: employeeValidationSchema,
    onSubmit: (values) => {
      const updatedData = {
        ...userData,
        ...values,
      };

      if (updatedData.workingStatus === "Bench") {
        updatedData.workingOnClientName = "";
      }

      if (updatedData.attendance === "Absent") {
        updatedData.updates = "";
      }

      updateUserUpdates(userData._id, updatedData)
        .then((res) => {
          // formik.resetForm();
          // setFormErrors({});
          if (Number(res.data.status) === 1) {
            toast.success(res.data.message);
            setTimeout(() => {
              navigate("/dashboard");
            }, 1000);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
          console.log("Error occurred:", error);
        })
        .finally(() => {
          formik.setTouched({
            workingStatus: true,
            attendance: true,
            workingFrom: true,
            workingOnClientName: true,
            updates: true,
          });
          fetchTableData();
        });
    },
  });

  const handleChange = (e) => {
    formik.handleChange(e);
  };

  return (
    <Card className="employeeFormcard">
      <form onSubmit={formik.handleSubmit}>
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
              >
                <MenuItem value="" disabled>
                  Select status
                </MenuItem>
                <MenuItem value="Bench">Bench</MenuItem>
                <MenuItem value="Client">Client</MenuItem>
                <MenuItem value="Shadow">Shadow</MenuItem>
              </TextField>
              {formik.touched.workingStatus && formik.errors.workingStatus && (
                <span className="errorMsg">{formik.errors.workingStatus}</span>
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
              >
                <MenuItem value="" disabled>
                  Select attendance
                </MenuItem>
                <MenuItem value="Present">Present</MenuItem>
                <MenuItem value="Absent">Absent</MenuItem>
              </TextField>
              {formik.touched.attendance && formik.errors.attendance && (
                <span className="errorMsg">{formik.errors.attendance}</span>
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
              >
                <MenuItem value="" disabled>
                  Select
                </MenuItem>
                <MenuItem value="Home">Home</MenuItem>
                <MenuItem value="Office">Office</MenuItem>
                <MenuItem value="Client Office">Client Office</MenuItem>
              </TextField>
              {formik.touched.workingFrom && formik.errors.workingFrom && (
                <span className="errorMsg">{formik.errors.workingFrom}</span>
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
              />
              {formik.touched.workingOnClientName &&
                formik.errors.workingOnClientName && (
                  <span className="errorMsg">
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
              />
              {formik.touched.updates && formik.errors.updates && (
                <span className="errorMsg">{formik.errors.updates}</span>
              )}
            </Grid>
          )}

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="justify-content-end"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default UpdateEmployeeForm;

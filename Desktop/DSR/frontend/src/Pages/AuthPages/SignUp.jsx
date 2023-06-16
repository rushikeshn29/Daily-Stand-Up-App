import * as React from "react";
import "../../Styles/login.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { FormHelperText } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { DEFAULT_TL_ID } from "../../Utils/Constants";
import { toast, ToastContainer } from "react-toastify";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { registration } from "../../Validation/ValidationRules";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getTeamLead, registerUser } from "../../Controllers/authController";
import {
  Avatar,
  Button,
  InputLabel,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";

const theme = createTheme();

const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

export default function SignUp() {
  const navigate = useNavigate();

  //States
  const [tldata, setTldata] = React.useState([]);
  const [department, setDepartment] = React.useState(null);
  const [imgPath, setImgPath] = React.useState({});
  const [tl, setTl] = React.useState("");

  React.useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate(-1);
    } else getTl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTl = async () => {
    const response = await getTeamLead();
    setTldata(response.data.data);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmpassword: "",
      department: "",
      employeeId: "",
      teamLeadId: "",
      contact: "",
    },
    validationSchema: registration,
    onSubmit: (values, action) => {
      handleOnSubmit(values);
    },
  });
  const handleOnSubmit = (values) => {
    const formData = new FormData();
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("confirmpassword", values.confirmpassword);
    formData.append("contact", values.contact);
    formData.append("teamLeadId", values.teamLeadId);
    formData.append("employeeId", values.employeeId);
    formData.append("department", values.department);
    formData.append(
      "profileImage",
      imgPath.target.files.length > 0 ? imgPath.target.files[0] : imgPath
    );

    registerUser(formData)
      .then((res) => {
        if (Number(res.data.status) === 1) {
          toast.success(res.data.message);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong ! Please Try again later..");
      });
  };

  const handleImage = (e) => {
    setImgPath(e);

    formik.setFieldValue("profileImage", e);
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid className="mainSignUp" container component="main">
        <ToastContainer />
        <CssBaseline />
        <Grid className="registermaindiv" item xs={false} sm={4} md={7} />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            className="registerBox"
            sx={{
              my: 8,
              mx: 4,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register Here
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    // required
                    fullWidth
                    id="firstName"
                    label="First Name "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.errors.firstName &&
                      formik.touched.firstName &&
                      String(formik.errors.firstName)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="lastName"
                    // required
                    fullWidth
                    id="lastName"
                    label="Last Name "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.errors.lastName &&
                      formik.touched.lastName &&
                      String(formik.errors.lastName)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    // required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.errors.email &&
                      formik.touched.email &&
                      String(formik.errors.email)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    // required
                    fullWidth
                    name="contact"
                    label="Contact Number"
                    type="text"
                    id="contact"
                    autoComplete="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.errors.contact &&
                      formik.touched.contact &&
                      String(formik.errors.contact)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    // required
                    fullWidth
                    name="employeeId"
                    label="Employee Id"
                    type="text"
                    id="employeeId"
                    autoComplete="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.errors.employeeId &&
                      formik.touched.employeeId &&
                      String(formik.errors.employeeId)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Department
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="department"
                      name="department"
                      value={department}
                      autoWidth
                      onChange={(e) => {
                        formik.setFieldValue("department", e.target.value);
                        setDepartment(e.target.value);
                      }}
                      onBlur={() => {
                        formik.setTouched({ department: true });
                      }}
                      // fullWidth
                      label="Department"
                      MenuProps={MenuProps}
                    >
                      <MenuItem value="Javascript">Javascript</MenuItem>
                      <MenuItem value="PHP">PHP</MenuItem>
                      <MenuItem value="Devops">Devops</MenuItem>
                      <MenuItem value="Mobile">Mobile</MenuItem>
                      <MenuItem value="Python">Python</MenuItem>
                      <MenuItem value="dotNet">dotNet</MenuItem>
                      <MenuItem value="Ui/Ux">Ui/Ux</MenuItem>
                    </Select>
                    <FormHelperText>
                      {formik.errors.department &&
                        formik.touched.department &&
                        formik.errors.department}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Team Lead
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="teamLeadId"
                      name="teamLeadId"
                      autoWidth
                      MenuProps={MenuProps}
                      value={tl}
                      onBlur={() => {
                        formik.setTouched({ teamLeadId: true });
                      }}
                      onChange={(e) => {
                        formik.setFieldValue("teamLeadId", e.target.value);
                        setTl(e.target.value);
                      }}
                      // fullWidth
                      label="Team Lead"
                    >
                      <MenuItem value={`${DEFAULT_TL_ID}`}>
                        Register me as Team Lead
                      </MenuItem>
                      {tldata.map((lead, i) => {
                        return (
                          <MenuItem key={i} value={lead._id}>
                            {lead.firstName} {lead.lastName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>
                      {formik.errors.teamLeadId &&
                        formik.touched.teamLeadId &&
                        formik.errors.teamLeadId}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    // required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.errors.password &&
                      formik.touched.password &&
                      String(formik.errors.password)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    // required
                    fullWidth
                    name="confirmpassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmpassword"
                    autoComplete="new-password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.errors.confirmpassword &&
                      formik.touched.confirmpassword &&
                      String(formik.errors.confirmpassword)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="profileImage"
                    fullWidth
                    id="profileImage"
                    autoFocus
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Profile Image"
                    type="file"
                    onChange={(e) => {
                      handleImage(e);
                    }}
                  />
                  <FormHelperText>
                    {formik.errors.profileImage &&
                      formik.touched.profileImage &&
                      formik.errors.profileImage}
                  </FormHelperText>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

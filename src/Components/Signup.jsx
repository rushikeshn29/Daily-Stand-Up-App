import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../Styles/login.css";
import "react-toastify/dist/ReactToastify.css";
import { registration } from "../Validation/ValidationRules";
import { useFormik } from "formik";
import { registerUser } from "../Controller/Controller";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const theme = createTheme();
export default function SignInSide() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if(localStorage.getItem("user")){
      navigate('/dashboard')
    }
  }, [])
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fname: "",
      lname: "",
      confirmpassword: "",
      role: "",
      tc: true,
    },
    validationSchema: registration,
   
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const finalData = {
      email: data.get("email"),
      password: data.get("password"),
      confirmpassword: data.get("confirmpassword"),
      fname: data.get("fname"),
      lname: data.get("lname"),
      contact: data.get("contact"),
    };
    console.log(finalData);

    registerUser(finalData)
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
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        className="loginmaindiv"
        container
        component="main"
        sx={{ height: "100vh" }}
      >
        <ToastContainer />
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundPosition: "center",
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register Here
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="fname"
                    required
                    fullWidth
                    id="fname"
                    label="First Name"
                    autoFocus
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.errors.fname &&
                      formik.touched.fname &&
                      String(formik.errors.fname)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lname"
                    label="Last Name"
                    name="lname"
                    autoComplete="family-name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.errors.lname &&
                      formik.touched.lname &&
                      String(formik.errors.lname)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
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
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="contact"
                    label="Contact Number"
                    type="number"
                    id="contact"
                    autoComplete="number"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
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
                <Grid item xs={12}>
                  <TextField
                    required
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

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
import { useFormik } from "formik";
import { login } from "../Validation/ValidationRules";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { loginUser } from "../Controller/Controller";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000/">
        Qma
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}



const theme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: login,
    
  });

  React.useEffect(() => {
    if(localStorage.getItem("user")){
      navigate('/dashboard')
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const finalData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    loginUser(finalData)
      .then((res) => {
        if (res.data.status === 1) {
        localStorage.setItem('user', res.data.data.token);
        console.log("risjf")

          toast.success(res.data.data.fname + " Logged In");

          setTimeout(() => {
            navigate("/dashboard");
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
            <h1>Welcome Back ,</h1>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Email Address"
                name="email"
                autoComplete="email"
                helperText={
                  formik.errors.email &&
                  formik.touched.email &&
                  String(formik.errors.email)
                }
                autoFocus
              />

              <TextField
                margin="normal"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={
                  formik.errors.password &&
                  formik.touched.password &&
                  String(formik.errors.password)
                }
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

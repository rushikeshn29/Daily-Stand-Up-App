import * as React from "react";
import "../../Styles/login.css";
import { useFormik } from "formik";
import jwtdecode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { DEFAULT_TL_ID } from "../../Utils/Constants";
import { toast, ToastContainer } from "react-toastify";
import { loginUser } from "../../Controllers/authController";
import Visibility from '@mui/icons-material/Visibility';
import { login } from "../../Validation/ValidationRules";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Avatar,
  Typography,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";

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
        Neosoft
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
// const theme = createTheme();


function SignIn() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: login,
  });
  const [showPassword, setShowPassword] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          localStorage.setItem("user", res.data.data.token);
          const payload = jwtdecode(res.data.data.token);

          toast.success("Logged In Successfully");
          setTimeout(() => {
            navigate(
              payload.Tl === DEFAULT_TL_ID
                ? "dashboard"
                : `/dashboard/report/${payload.userID}`
            );
          }, 1000);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Grid className="mainSignIn" container component="main">
        <ToastContainer />
        <CssBaseline />
        <Grid className="loginmaindiv" item xs={false} sm={4} md={7} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            className="loginBox"
            sx={{
              my: 8,
              mx: 4,
            }}
          >
            <h1>Welcome Back,</h1>
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
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                helperText={
                  formik.errors.password &&
                  formik.touched.password &&
                  String(formik.errors.password)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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

export default SignIn;

import * as React from "react";
import jwtdecode from "jwt-decode";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import { toast, ToastContainer } from "react-toastify";
import { styled, useTheme } from "@mui/material/styles";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  List,
  CssBaseline,
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
  Avatar,
  Divider,
  Toolbar,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Navbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const payload = localStorage.getItem("user")
    ? jwtdecode(localStorage.getItem("user"))
    : "";
  const name = payload.firstName;
  const uEmail = payload.email;

  // States
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(open === true ? false : true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <ToastContainer />
      <AppBar
        position="fixed"
        open={open}
        sx={{ backgroundColor: "black", padding: 0 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
            }}
          >
            <MenuIcon />
          </IconButton>

          <h2>
            Neo<span style={{ color: "red" }}>SOFT</span>
            <span>&#174;</span>
          </h2>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {open && (
            <ListItem
              disablePadding
              sx={{ display: "block", marginTop: "1px" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <Card sx={{ width: 400, maxHeight: 200 }}>
                  <CardContent>
                    <Avatar
                      alt="Remy Sharp"
                      src={payload.image}
                      sx={{
                        position: "absolute",
                        width: 50,
                        height: 50,
                        marginTop: 0,
                      }}
                      // sx={{ width: 24, height: 24 }}
                    />
                    <Typography
                      sx={{ marginLeft: 7, marginTop: 1 }}
                      variant="h6"
                      component="div"
                    >
                      Hello {name} !!
                    </Typography>
                    <Typography
                      sx={{ marginLeft: 7, fontSize: 13 }}
                      variant="body2"
                      color="text.secondary"
                    >
                      {uEmail}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      sx={{ marginLeft: 20 }}
                      size="small"
                      onClick={(e) => {
                        localStorage.removeItem("user");
                        toast.success("Logged Out Successfully");
                        setTimeout(() => {
                          navigate("/");
                        }, 1000);
                      }}
                    >
                      logout
                    </Button>
                  </CardActions>
                </Card>
              </ListItemButton>
            </ListItem>
          )}
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => navigate("/dashboard")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Dashboard"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => navigate("/create")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <NewspaperIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Updates"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}

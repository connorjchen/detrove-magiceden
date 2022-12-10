import React, { useEffect, useState } from "react";
import {
  useTheme,
  alpha,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Drawer,
} from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import detroveLogo from "../images/detroveLogo.svg";
import SearchBar from "./searchBar";
import { RequestsEnum } from "../redux/helpers/requestsEnum";
import { getLoadingAndErrors } from "../redux/helpers/requestsSelectors";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { displayErrors } from "../utils/utils.js";
import { getUser } from "../redux/actions/profileActions";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

const drawerWidth = 240;
const navItems = [
  ["Marketplace", "/marketplace"],
  ["Profile", "/profile"],
];

export default function NavBar(props) {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);
  const { errors } = useSelector((state) =>
    getLoadingAndErrors(state, [RequestsEnum.profileGetUser])
  );

  const googleSignInSuccess = (response) => {
    const user = response.profileObj;
    dispatch(getUser(user.email));
    localStorage.setItem("userEmail", user.email);
  };

  const googleSignInFailure = (error) => {
    enqueueSnackbar(error.error, { variant: "error" });
  };

  const googleSignOut = () => {
    dispatch(getUser(null));
    navigate("/marketplace");
    localStorage.removeItem("userEmail");
  };

  const googleClientId =
    "320221953489-1m1bpln163tqqvfkgh3fhpgdv15jm5nd.apps.googleusercontent.com";

  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
        clientId: googleClientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  useEffect(() => {
    displayErrors(errors, enqueueSnackbar);
  }, [errors, enqueueSnackbar]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const NavBarText = ({ text }) => {
    return (
      <Typography
        variant="h6"
        color={theme.palette.secondary.bold}
        sx={{
          ...theme.easeTransition,
          whiteSpace: "nowrap",
          padding: "0 16px 0 0",
          "&:hover": {
            color: theme.palette.tertiary.main,
          },
        }}
      >
        {text}
      </Typography>
    );
  };

  return (
    <Box display="flex" height="54px">
      <AppBar
        sx={{
          backgroundColor: alpha(theme.palette.primary.main, 0.75),
          color: theme.palette.tertiary.main,
          backdropFilter: "blur(20px)",
          boxShadow: "none",
          padding: "0 32px",
          left: "initial",
          right: "initial",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            padding: "16px 0 !important",
            minHeight: "48px !important",
            boxSizing: "content-box",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box component="img" src={detroveLogo} alt="logo" width="40px" />
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: theme.palette.accent.dark,
                marginRight: "32px",
              }}
            >
              Detrove
            </Typography>
          </Link>
          <Box sx={{ display: { md: "none" } }}>
            <IconButton size="large" aria-label="search" color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              width: "100%",
            }}
          >
            <SearchBar />
          </Box>
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            {navItems.map(([item, link], i) => (
              <Link key={i} to={link} style={{ textDecoration: "none" }}>
                <NavBarText text={item} />
              </Link>
            ))}
            {user ? (
              <GoogleLogout
                clientId={googleClientId}
                buttonText="Sign out"
                onLogoutSuccess={googleSignOut}
              >
                <NavBarText text="Sign out" />
              </GoogleLogout>
            ) : (
              <GoogleLogin
                clientId={googleClientId}
                onSuccess={googleSignInSuccess}
                onFailure={googleSignInFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
              >
                <NavBarText text="Sign in with Google" />
              </GoogleLogin>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ color: theme.palette.tertiary.main }}>
        <Drawer
          anchor="right"
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Box onClick={handleDrawerToggle} textAlign="center">
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: theme.palette.tertiary.main,
              }}
            >
              <Typography variant="h6" sx={{ my: 2, fontWeight: "bold" }}>
                Detrove
              </Typography>
            </Link>
            <Divider />
            <List>
              {navItems.map(([item, link], i) => (
                <Link
                  key={i}
                  to={link}
                  style={{
                    textDecoration: "none",
                    color: theme.palette.tertiary.main,
                  }}
                >
                  <ListItem key={item} disablePadding>
                    <ListItemButton sx={{ textAlign: "center" }}>
                      <ListItemText primary={item} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
            {user ? (
              <GoogleLogout
                clientId={googleClientId}
                onLogoutSuccess={googleSignOut}
              >
                <Typography variant="h6" fontWeight="normal">
                  Sign out
                </Typography>
              </GoogleLogout>
            ) : (
              <GoogleLogin
                clientId={googleClientId}
                onSuccess={googleSignInSuccess}
                onFailure={googleSignInFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
              >
                <Typography variant="h6" fontWeight="normal">
                  Sign in with Google
                </Typography>
              </GoogleLogin>
            )}
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
}

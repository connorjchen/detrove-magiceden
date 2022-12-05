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
import { Menu as MenuIcon } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import detroveLogo from "../images/detroveLogo.svg";
import SearchBar from "./searchBar";
import jwt_decode from "jwt-decode";
import { RequestsEnum } from "../redux/helpers/requestsEnum";
import { getLoadingAndErrors } from "../redux/helpers/requestsSelectors";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { displayErrors } from "../utils/utils.js";
import { getUser } from "../redux/actions/profileActions";

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
  ); // did not use isLoading

  const googleSignOutCallback = () => {
    dispatch(getUser(null));
    navigate("/");
    localStorage.removeItem("userEmail");
  };

  useEffect(() => {
    const googleSignInCallback = (response) => {
      const user = jwt_decode(response.credential);
      dispatch(getUser(user.email));
      localStorage.setItem("userEmail", user.email);
    };

    /* global google */
    google.accounts.id.initialize({
      client_id:
        "320221953489-1m1bpln163tqqvfkgh3fhpgdv15jm5nd.apps.googleusercontent.com",
      callback: (response) => googleSignInCallback(response),
    });

    if (localStorage.getItem("userEmail")) {
      dispatch(getUser(localStorage.getItem("userEmail")));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      google.accounts.id.renderButton(document.getElementById("googleSignIn"), {
        theme: "outline",
        size: "large",
      });
      document.getElementById("googleSignIn").hidden = false;
    } else {
      document.getElementById("googleSignIn").hidden = true;
    }
  }, [user]);

  useEffect(() => {
    displayErrors(errors, enqueueSnackbar);
  }, [errors, enqueueSnackbar]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} textAlign="center">
      <Typography variant="h6" sx={{ my: 2, fontWeight: "bold" }}>
        Detrove
      </Typography>
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
    </Box>
  );

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
            minHeight: "fit-content !important",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              width: "100%",
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
            <SearchBar />
          </Box>
          <Box
            sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
          >
            <Box
              component="a"
              href="https://detrove.gitbook.io/litepaper/"
              target="_blank"
              rel="noreferrer"
              sx={{
                textDecoration: "none",
              }}
            >
              <NavBarText text="Docs" />
            </Box>
            {navItems.map(([item, link], i) => (
              <Link key={i} to={link} style={{ textDecoration: "none" }}>
                <NavBarText text={item} />
              </Link>
            ))}
            <Box id="googleSignIn"></Box>
            {user && (
              <Box
                onClick={() => googleSignOutCallback()}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                {<NavBarText text="Sign Out" />}
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ color: theme.palette.tertiary.main }}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

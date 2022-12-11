import React, { useEffect, useState, useMemo } from "react";
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
import { gapi } from "gapi-script";
import "./wallet.css";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
require("@solana/wallet-adapter-react-ui/styles.css");

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
  const [isConnected, setIsConnected] = React.useState(false);
  const { publicKey, wallet, disconnect } = useWallet();
  const navigate = useNavigate();

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const content = useMemo(() => {
    if (!wallet || !base58) {
      return "Connect";
    }
    setIsConnected(true);
    return base58.slice(0, 4) + ".." + base58.slice(-4);
  }, [wallet, base58]);

  const { user } = useSelector((state) => state.profile);
  const { errors } = useSelector((state) =>
    getLoadingAndErrors(state, [RequestsEnum.profileGetUser])
  );

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
            <WalletMultiButton
              className={
                isConnected ? "wallet-button-connected" : "wallet-button"
              }
              children={content}
            />
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
            <WalletMultiButton
              className={
                isConnected ? "wallet-button-connected" : "wallet-button"
              }
              children={content}
            />
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
}

import React from "react";
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
  Button,
  Drawer,
} from "@mui/material";
import { Menu as MenuIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import phantomLogo from "../images/phantomLogo.svg";
import SearchBar from "./searchBar";

const drawerWidth = 240;
const navItems = [
  ["Marketplace", "/"],
  ["Sell", "/sell"],
];

export default function NavBar(props) {
  const theme = useTheme();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

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
            <Link to="/" style={{ textDecoration: "none" }}>
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
            {navItems.map(([item, link], i) => (
              <Link key={i} to={link} style={{ textDecoration: "none" }}>
                <Typography
                  variant="h6"
                  color={theme.palette.secondary.bold}
                  sx={{
                    ...theme.easeTransition,
                    padding: "0 16px 0 0",
                    "&:hover": {
                      color: theme.palette.tertiary.main,
                    },
                  }}
                >
                  {item}
                </Typography>
              </Link>
            ))}
            <Box
              component="a"
              href="https://detrove.gitbook.io/litepaper/"
              target="_blank"
              rel="noreferrer"
              sx={{
                textDecoration: "none",
              }}
            >
              <Typography
                variant="h6"
                color={theme.palette.secondary.bold}
                sx={{
                  ...theme.easeTransition,
                  padding: "0 16px 0 0",
                  "&:hover": {
                    color: theme.palette.tertiary.main,
                  },
                }}
              >
                Docs
              </Typography>
            </Box>
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                background: "rgba(22, 22, 26, 0.5)",
                borderRadius: "16px",
                padding: "6px 12px 6px 8px",
                "&:hover": {
                  background: "rgba(22, 22, 26, 0.5)",
                },
              }}
            >
              <Box component="img" src={phantomLogo} alt="phantom logo" />
              <Typography variant="h6" color={theme.palette.primary.main}>
                Connect
              </Typography>
            </Button>
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

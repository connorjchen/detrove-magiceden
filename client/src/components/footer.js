import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Box, Typography, useTheme, Divider } from "@mui/material";
import DrawerAppBar from "../components/navBar";
import { getListing } from "../redux/actions/listingActions";

export default function Footer() {
  const theme = useTheme();

  function StyledTypography({ text }) {
    return (
      <Typography
        variant="h6"
        fontWeight="normal"
        color={theme.palette.secondary.bold}
        sx={{
          cursor: "pointer",
          padding: "0 8px",
          ...theme.easeTransition,
          "&:hover": {
            color: theme.palette.tertiary.main,
          },
        }}
      >
        {text}
      </Typography>
    );
  }

  return (
    <Box>
      <Divider />
      <Box display="flex" justifyContent="space-between" padding="16px 32px">
        <Typography
          variant="h6"
          fontWeight="normal"
          color={theme.palette.secondary.bold}
        >
          © Detrove, Inc.
        </Typography>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <StyledTypography text="Privacy Policy" />
          <StyledTypography text="Terms of Service" />
        </Box>
      </Box>
    </Box>
  );
}

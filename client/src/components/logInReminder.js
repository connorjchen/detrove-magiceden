import React from "react";

import { Box, Typography, useTheme } from "@mui/material";

export default function LogInReminder() {
  const theme = useTheme();

  return (
    <Box
      borderRadius="16px"
      border={`1px solid ${theme.palette.secondary.outline}`}
      display="flex"
      height="100%"
      width="100%"
    >
      <Typography
        variant="h6"
        fontSize="30px"
        fontWeight="normal"
        margin="auto"
      >
        Log in with Google!
      </Typography>
    </Box>
  );
}

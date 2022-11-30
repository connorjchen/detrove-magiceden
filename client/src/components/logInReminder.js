import React from "react";

import { Box, Typography, useTheme } from "@mui/material";

export default function LogInReminder() {
  const theme = useTheme();

  return (
    <Box display="flex" height="100%">
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

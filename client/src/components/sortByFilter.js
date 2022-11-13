import React, { useState } from "react";
import {
  Box,
  useTheme,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Fade,
  ClickAwayListener,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import checkMark from "../images/checkMark.svg";

export default function SortByFilter({ sortBy, setSortBy, options }) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setExpanded(false)}>
      <Box width="max-content">
        <Box
          sx={{
            ...theme.basicButton,
            height: "48px",
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <Typography variant="h6" whiteSpace="nowrap">
            {sortBy}
          </Typography>
        </Box>
        <Fade in={expanded} timeout={{ enter: 225, exit: 0 }}>
          <Box
            sx={{
              ...theme.dropdownBox,
              top: "139px",
              marginTop: "-131px",
            }}
          >
            {options.map((option, i) => (
              <Box
                key={i}
                sx={{
                  ...theme.dropdownOption,
                }}
                onClick={() => setSortBy(option)}
              >
                <Typography variant="h6" fontSize="14px">
                  {option}
                </Typography>
                <Box width="12px" marginLeft="16px">
                  {sortBy === option && (
                    <Box
                      component="img"
                      src={checkMark}
                      alt="check mark"
                      width="100%"
                    />
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Fade>
      </Box>
    </ClickAwayListener>
  );
}

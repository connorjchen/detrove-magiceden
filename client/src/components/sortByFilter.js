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

export default function SortByFilter({ sortBy, setSortBy }) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const options = [
    "Recently listed",
    "Price: Low to High",
    "Price: High to Low",
  ];

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
              right: "32px",
            }}
          >
            {options.map((option, i) => (
              <Box
                key={i}
                sx={{
                  ...theme.dropdownOption,
                }}
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

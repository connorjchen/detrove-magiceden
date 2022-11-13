import React, { useState, useEffect } from "react";
import { OutlinedInput, useTheme, Fade, Box, Typography } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import hermesSneaker from "../images/hermesSneaker.jpg";

export default function SearchBar() {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const options = [
    ["Hermes Expert Sneaker", hermesSneaker],
    ["Hermes Expert Sneaker", hermesSneaker],
    ["Hermes Expert Sneaker", hermesSneaker],
  ];

  return (
    <Box width="100%" maxWidth="700px" marginRight="32px">
      <OutlinedInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        startAdornment={
          <SearchIcon sx={{ color: theme.palette.secondary.bold }} />
        }
        placeholder="Search"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        sx={{
          ...theme.inputAnimation,
          height: "48px",
          width: "100%",
        }}
      />
      <Fade in={isFocused} timeout={{ enter: 225, exit: 0 }}>
        <Box
          sx={{
            ...theme.dropdownBox,
            top: "216px",
            marginTop: "-208px",
          }}
        >
          {options.map(([title, image], i) => (
            <Box
              key={i}
              sx={{
                ...theme.dropdownOption,
                justifyContent: "normal",
              }}
            >
              <Box
                component="img"
                src={image}
                alt="image"
                width="48px"
                borderRadius="10px"
                marginRight="16px"
              />
              <Typography
                variant="h6"
                fontSize="14px"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Fade>
    </Box>
  );
}

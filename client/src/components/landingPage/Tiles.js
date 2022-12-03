import { Box, SxProps, Typography, useMediaQuery } from "@mui/material";
import React from "react";
const Tile = ({
  title,
  text,
  compact,
  blackBg,
  imgSrcIcon,
  imgSrcPolygon,
  imgSrcImage,
  sx,
}) => {
  const mobile = useMediaQuery("(max-width:600px)");
  return (
    <Box
      sx={{
        width: { xs: 1, md: compact ? 0.45 : 0.55 },
        bgcolor: blackBg ? "black" : "#F2F2F2",
        borderRadius: "16px",
        position: "relative",
        overflow: "hidden",
        ...sx,
      }}
    >
      <Box
        sx={{
          mx: { xs: 4, md: compact ? 14.5 : 10 },
          mt: { xs: 6, md: compact ? 13.25 : 10 },
          mb: { xs: 6, md: compact ? 13.25 : 0 },
        }}
      >
        {imgSrcIcon && (
          <img
            src={imgSrcIcon}
            style={{
              width: mobile ? "60px" : "auto",
              marginBottom: mobile ? "16px" : "32px",
            }}
            alt=""
          ></img>
        )}
        <Typography
          sx={{
            fontSize: { xs: "1.5rem", sm: "2rem" },
            fontWeight: 500,
            lineHeight: "36px",
            letterSpacing: "-2px",
            color: blackBg ? "white" : "black",
          }}
        >
          {imgSrcPolygon && (
            <img
              src={imgSrcPolygon}
              style={{
                height: mobile ? "24px" : "auto",
                marginRight: "12px",
                transform: "translateY(4px)",
              }}
              alt=""
            ></img>
          )}
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: 500,
            lineHeight: "24px",
            letterSpacing: "-0.8px",
            color: blackBg ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
            mt: 2.5,
          }}
        >
          {text}
        </Typography>
        {imgSrcImage && (
          <Box sx={{ height: { xs: "270px", sm: "360px" } }}></Box>
        )}
        {imgSrcImage && (
          <Box
            sx={{
              width: 1,
              position: "absolute",
              bottom: 0,
              left: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={imgSrcImage}
              style={{
                height: mobile ? "250px" : "340px",
              }}
              alt=""
            ></img>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Tile;

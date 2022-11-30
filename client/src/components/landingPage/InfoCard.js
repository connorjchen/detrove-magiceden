import { Box, SxProps, Typography } from "@mui/material";

const accentImages = {
  orange: "polygon-orange.png",
  red: "polygon-red.png",
  purple: "polygon-purple.png",
  blue: "polygon-blue.png",
};

const InfoCard = ({ title, text, color, sx }) => {
  return (
    <Box
      sx={{
        width: 1,
        borderRadius: "16px",
        boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.1)",
        position: "relative",
        ...sx,
      }}
    >
      <img
        src={accentImages[color]}
        alt="orange arrow pointing right"
        style={{
          height: "24px",
          position: "absolute",
          left: 0,
          top: 32,
        }}
      />
      <img
        src={accentImages[color]}
        alt="orange arrow pointing left"
        style={{
          height: "24px",
          position: "absolute",
          right: 0,
          top: 32,
          transform: "rotate(180deg)",
        }}
      />
      <Box sx={{ mx: 5.25 }}>
        <Typography
          sx={{
            fontSize: "1.125rem",
            fontWeight: 600,
            lineHeight: "24px",
            letterSpacing: -0.8,
            textTransform: "uppercase",
            color: "black",
            pt: 4.125,
            mb: 1.5,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            letterSpacing: -0.7,
            lineHeight: "24px",
            color: "black",
            pb: 4,
          }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default InfoCard;

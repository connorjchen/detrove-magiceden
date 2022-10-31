import React from "react";
import { Link } from "react-router-dom";
import {
  useTheme,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import solanaIcon from "../images/solanaIcon.png";

export default function ItemCard({ address, image, title, price, page }) {
  const theme = useTheme();

  function ItemCardContent() {
    return (
      <Box
        sx={{
          "&:hover .for-sale-popup": {
            opacity: "1",
          },
        }}
      >
        <CardMedia component="img" height="auto" image={image} alt="image" />
        <CardContent>
          <Typography
            variant="h6"
            fontSize={"14px"}
            sx={{
              marginBottom: "8px",
              height: "48px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {title}
          </Typography>
          <Typography variant="h6" fontSize={"12px"}>
            Price
          </Typography>
          <Box display="flex" alignItems="center">
            <Box
              component="img"
              src={solanaIcon}
              width="16px"
              marginRight="8px"
            />
            <Typography variant="h6">
              {price === undefined && page === "profile"
                ? "Unlisted"
                : `${price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} SOL`}
            </Typography>
          </Box>
        </CardContent>
        {!price && page == "profile" && (
          <Link
            to={`/sell/${address}`}
            style={{
              textDecoration: "none",
            }}
          >
            <Box
              className="for-sale-popup"
              sx={{
                display: "flex",
                backgroundColor: theme.palette.accent.dark,
                color: theme.palette.primary.main,
                height: "58px",
                bottom: "58px",
                marginBottom: "-58px",
                position: "relative",
                padding: "0 16px",
                opacity: 0,
                cursor: "pointer",
                ...theme.easeTransition,
                "&:hover": {
                  backgroundColor: theme.palette.accent.hover,
                },
              }}
              onClick={() => console.log("redirect to for sale page")}
            >
              <Typography variant="h6" textAlign="center" margin="auto">
                List for Sale
              </Typography>
            </Box>
          </Link>
        )}
      </Box>
    );
  }

  if (page == "marketplace") {
    return (
      <Link
        to={`/solana/${address}`}
        style={{
          textDecoration: "none",
        }}
      >
        <Card
          sx={{
            borderRadius: "16px",
            boxShadow:
              "0px 2px 16px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
            ...theme.easeTransition,
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <CardActionArea>
            <ItemCardContent />
          </CardActionArea>
        </Card>
      </Link>
    );
  } else if (page == "sell") {
    return (
      <Card
        sx={{
          borderRadius: "16px",
          boxShadow:
            "0px 2px 16px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
          width: "400px",
        }}
      >
        <CardActionArea
          disableRipple={true}
          sx={{
            cursor: "default",
            "&:hover": {
              "& .MuiCardActionArea-focusHighlight": {
                opacity: 0,
              },
            },
          }}
        >
          <ItemCardContent />
        </CardActionArea>
      </Card>
    );
  } else if (page == "profile") {
    return (
      <Link
        to={`/solana/${address}`}
        style={{
          textDecoration: "none",
        }}
      >
        <Card
          sx={{
            borderRadius: "16px",
            boxShadow:
              "0px 2px 16px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
            ...theme.easeTransition,
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <CardActionArea>
            <ItemCardContent />
          </CardActionArea>
        </Card>
      </Link>
    );
  }
}

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  useTheme,
  Grid,
  ClickAwayListener,
  Fade,
} from "@mui/material";
import ContentBox from "../components/contentBox";
import hermesSneaker from "../images/hermesSneaker.jpg"; // remove to be dynamic with data
import LineGraph from "../components/linegraph";

export default function Product() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { sneakerId } = useParams();

  const [sizeSelected, setSizeSelected] = useState("Select Size");

  const sizes = [
    "US M 3.5",
    "US M 4",
    "US M 4.5",
    "US M 5",
    "US M 5.5",
    "US M 6",
    "US M 6.5",
    "US M 7",
    "US M 7.5",
    "US M 8",
    "US M 8.5",
    "US M 9",
    "US M 9.5",
    "US M 10",
    "US M 10.5",
    "US M 11",
    "US M 11.5",
    "US M 12",
    "US M 12.5",
    "US M 13",
    "US M 14",
    "US M 15",
    "US M 16",
    "US M 17",
    "US M 18",
  ];

  const itemInfo = {
    Brand: "Hermes",
    Condition: "New",
    Colorway: "Marine / Orange",
    SKU: "123456",
    "Release Date": "1/1/2021",
    "Retail Price": "$1,050",
  }; // switch to be dynamic with data

  const tokenInfo = {
    "Contract Address": "0x8928...ca85",
    Blockchain: "Solana",
    "Token ID": "123456",
    "Token Standard": "ERC-721",
  }; // switch to be dynamic with data

  function ItemLabels() {
    return (
      <>
        {Object.keys(itemInfo).map((key, i) => (
          <Grid item xs={2} key={i} textAlign="center">
            <Box margin="16px 0">
              <Typography variant="h6">{key}</Typography>
              <Typography variant="h6" fontWeight="normal">
                {itemInfo[key]}
              </Typography>
            </Box>
          </Grid>
        ))}
      </>
    );
  }

  function TokenLabels() {
    return (
      <>
        {Object.keys(tokenInfo).map((key, i) => (
          <Box key={i} display="flex" justifyContent="space-between">
            <Typography variant="h6">{key}</Typography>
            <Typography variant="h6" fontWeight="normal">
              {tokenInfo[key]}
            </Typography>
          </Box>
        ))}
      </>
    );
  }

  function SelectSize() {
    const [expanded, setExpanded] = useState(false);

    return (
      <ClickAwayListener onClickAway={() => setExpanded(false)}>
        <Box>
          <Box
            sx={{
              ...theme.basicButton,
              height: "48px",
              marginTop: "16px",
            }}
            onClick={() => setExpanded(!expanded)}
          >
            <Typography variant="h6">{sizeSelected}</Typography>
          </Box>
          <Fade in={expanded} timeout={{ enter: 225, exit: 0 }}>
            <Box
              sx={{
                ...theme.dropdownBox,
                height: "240px",
                top: "240px",
                marginTop: "-232px",
                overflow: "auto",
              }}
            >
              {sizes.map((size, i) => (
                <Box
                  key={i}
                  sx={{
                    ...theme.dropdownOption,
                  }}
                  onClick={() => setSizeSelected(size)}
                >
                  <Typography variant="h6" fontSize="14px">
                    {size}
                  </Typography>
                  <Typography variant="h6" fontSize="14px">
                    100 SOL
                  </Typography>
                </Box>
              ))}
            </Box>
          </Fade>
        </Box>
      </ClickAwayListener>
    );
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Grid container spacing="16px" width="1200px">
        <Grid item xs={12}>
          <Typography variant="h6" fontSize="24px">
            Hermes Expert Sneaker
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <LineGraph />
        </Grid>
        <Grid item xs={4}>
          <Box marginLeft="48px">
            <Box
              component="img"
              src={hermesSneaker}
              width="100%"
              borderRadius="16px"
            />
            <SelectSize
              sizeSelected={sizeSelected}
              setSizeSelected={setSizeSelected}
              sizes={sizes}
            />
            <Link
              to={`/buy/${sneakerId}`}
              style={{
                textDecoration: "none",
              }}
            >
              <Box
                sx={{
                  ...theme.basicButton,
                  height: "48px",
                  backgroundColor: theme.palette.accent.dark,
                  color: theme.palette.primary.main,
                  marginTop: "16px",
                  "&:hover": {
                    backgroundColor: theme.palette.accent.hover,
                  },
                }}
                onClick={() => console.log("hi")}
              >
                <Typography variant="h6">Buy Now for 100 SOL</Typography>
              </Box>
            </Link>
          </Box>
        </Grid>
        <ItemLabels />
        <Grid item xs={12}>
          <ContentBox
            title="About"
            content={
              <Typography variant="h6" fontWeight="normal">
                Sneaker in knit and calfskin with leather patches and signature
                Clou de Selle details. Light sole with graphic design for a
                modern and athletic style. Hand made in Italy.
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={6}>
          <ContentBox title="Details" content={<TokenLabels />} />
        </Grid>
        <Grid item xs={6}>
          <ContentBox
            title="Information"
            content={
              <Typography variant="h6" fontWeight="normal">
                Any NFT issued by Detrove is redeemable for its physical
                counterpart at anytime. To redeem, please email
                contact@detrove.com. If you have any questions or concerns, you
                can reach us at contact@detrove.com.
              </Typography>
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
}

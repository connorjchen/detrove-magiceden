import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  useTheme,
  Grid,
  OutlinedInput,
  Divider,
} from "@mui/material";
import ItemCard from "../components/itemCard";
import hermesSneaker from "../images/hermesSneaker.jpg"; // remove to be dynamic with data
import solanaIcon from "../images/solanaIcon.png";

export default function Sell() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { address } = useParams();

  const [solPrice, setSolPrice] = useState("");
  const [usdPrice, setUsdPrice] = useState("0");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const solToUsedConversion = 32.34;

  const handleSolPriceChange = (event) => {
    const val = event.target.value;
    if (val.split(".")[1] && val.split(".")[1].length > 4) {
      return;
    }
    setSolPrice(val);
    setUsdPrice(
      (val * solToUsedConversion)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
  };

  function renderPriceInput() {
    return (
      <Box>
        <Typography variant="h6">Price</Typography>
        <OutlinedInput
          value={solPrice}
          type="number"
          onChange={(e) => handleSolPriceChange(e)}
          startAdornment={
            <Box
              component="img"
              src={solanaIcon}
              width="16px"
              marginRight="8px"
            />
          }
          placeholder="Amount"
          sx={{
            ...theme.inputAnimation,
            height: "48px",
            width: "100%",
          }}
        />
        <Typography
          variant="h6"
          fontSize="14px"
          fontWeight="normal"
          color={theme.palette.secondary.bold}
          display="flex"
          justifyContent="right"
        >
          ${usdPrice}
        </Typography>
      </Box>
    );
  }

  function FeesInfo({}) {
    return (
      <>
        <Typography variant="h6">Fees</Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography
            variant="h6"
            fontSize="14px"
            color={theme.palette.secondary.bold}
          >
            Service Fee
          </Typography>
          <Typography
            variant="h6"
            fontSize="14px"
            color={theme.palette.secondary.bold}
          >
            5%
          </Typography>
        </Box>
      </>
    );
  }

  function DurationInfo({}) {
    return (
      <>
        <Typography variant="h6">Duration</Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography
            variant="h6"
            fontSize="14px"
            color={theme.palette.secondary.bold}
          >
            Start Date
          </Typography>
          <Typography
            variant="h6"
            fontSize="14px"
            color={theme.palette.secondary.bold}
          >
            Today
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography
            variant="h6"
            fontSize="14px"
            color={theme.palette.secondary.bold}
          >
            End Date
          </Typography>
          <Typography
            variant="h6"
            fontSize="14px"
            color={theme.palette.secondary.bold}
          >
            6 Months from Today
          </Typography>
        </Box>
      </>
    );
  }

  function BuyButton({}) {
    return (
      <Box
        sx={{
          ...theme.basicButton,
          height: "48px",
          backgroundColor: theme.palette.accent.dark,
          color: theme.palette.primary.main,
          marginTop: "32px",
          "&:hover": {
            backgroundColor: theme.palette.accent.hover,
          },
        }}
        onClick={() => console.log("hi")}
      >
        <Typography variant="h6">Complete Listing</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center">
      <Box marginRight="64px" width="600px">
        <Typography variant="h6" fontSize="30px" marginBottom="16px">
          Sell NFT
        </Typography>
        {renderPriceInput(solPrice, handleSolPriceChange, usdPrice)}
        <Divider sx={{ margin: "16px 0" }} />
        <DurationInfo />
        <Divider sx={{ margin: "16px 0" }} />
        <FeesInfo />
        <BuyButton />
      </Box>
      <Box>
        <Typography variant="h6" marginBottom="16px">
          Preview
        </Typography>
        <ItemCard
          address={1}
          image={hermesSneaker}
          title={"Hermes Expert Sneaker Size 9M"}
          price={solPrice}
          page="sell"
        />
      </Box>
    </Box>
  );
}

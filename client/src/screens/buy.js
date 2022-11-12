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
  ClickAwayListener,
  Fade,
} from "@mui/material";
import { getListing } from "../redux/actions/listingActions";
import ItemCard from "../components/itemCard";
import hermesSneaker from "../images/hermesSneaker.jpg"; // remove to be dynamic with data
import solanaIcon from "../images/solanaIcon.png";

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

const priceForSize = [
  103.5, 104, 104.5, 105, 105.5, 106, 106.5, 107, 107.5, 108, 108.5, 109, 109.5,
  110, 110.5, 111, 111.5, 112, 112.5, 13, 14, 15, 16, 17, 18,
];

export default function Buy() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { address } = useParams();
  useEffect(() => {
    dispatch(getListing());
  }, [dispatch]);

  const { loading, error, listing } = useSelector((state) => state.listings);
  const [solPrice, setSolPrice] = useState("");
  const [usdPrice, setUsdPrice] = useState("0");
  const [sizeSelected, setSizeSelected] = useState("Select Size");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const solToUsedConversion = 32.34;

  const handleSolPriceChange = (event) => {
    const val = event.target.value;

    setSolPrice((val / solToUsedConversion).toFixed(2));
  };

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
                  onClick={() => {
                    setSizeSelected(size);
                    setUsdPrice(priceForSize[i]);
                    setSolPrice(
                      (priceForSize[i] / solToUsedConversion).toFixed(2)
                    );
                  }}
                >
                  <Typography variant="h6" fontSize="14px">
                    {size}
                  </Typography>
                  <Typography variant="h6" fontSize="14px">
                    {priceForSize[i]}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Fade>
        </Box>
      </ClickAwayListener>
    );
  }
  function PriceInfo({}) {
    return (
      <>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">Market Price:</Typography>
          <Typography variant="h6">${usdPrice}</Typography>
        </Box>
      </>
    );
  }
  function TotalCost({}) {
    return (
      <>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" fontSize="20px">
            Order Total:
          </Typography>
          <Typography variant="h6" fontSize="20px">
            ${(usdPrice * 1.09).toFixed(2)}
          </Typography>
        </Box>
      </>
    );
  }
  function FeesInfo({}) {
    return (
      <>
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
        <Box display="flex" justifyContent="space-between">
          <Typography
            variant="h6"
            fontSize="14px"
            color={theme.palette.secondary.bold}
          >
            Sales Taxes
          </Typography>
          <Typography
            variant="h6"
            fontSize="14px"
            color={theme.palette.secondary.bold}
          >
            4%
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
          Buy NFT
        </Typography>
        {/* <Typography variant="h6">Size:</Typography> */}

        <SelectSize />
        <Divider sx={{ margin: "16px 0" }} />
        <PriceInfo />
        <FeesInfo />
        <Divider sx={{ margin: "16px 0" }} />
        <TotalCost />
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

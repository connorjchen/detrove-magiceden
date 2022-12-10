import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Box, Typography, useTheme, Divider } from "@mui/material";
import ItemCard from "../components/itemCard";
import jordanObsidian from "../images/jordanObsidian.jpg"; // remove to be dynamic with data
import { SelectSize } from "../components/selectSize";
import {
  getListings,
  getSneaker,
  purchaseListing,
} from "../redux/actions/buyActions";
import { displayErrors, convertToDisplayPrice } from "../utils/utils.js";
import { RequestsEnum } from "../redux/helpers/requestsEnum";
import { getLoadingAndErrors } from "../redux/helpers/requestsSelectors";
import { useSnackbar } from "notistack";
import Loading from "../components/loading";
import LogInReminder from "../components/logInReminder";

export default function Buy() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const { sneakerId } = useParams();
  const { sneaker, listings } = useSelector((state) => state.buy);
  const { user } = useSelector((state) => state.profile);
  const { isLoading, errors } = useSelector((state) =>
    getLoadingAndErrors(state, [
      RequestsEnum.profileGetUser,
      RequestsEnum.buyGetSneaker,
      RequestsEnum.buyGetListings,
    ])
  );
  const [sizeSelected, setSizeSelected] = useState("Select Size");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (searchParams.get("size")) {
      const searchParamSize = Number(searchParams.get("size"));
      setSizeSelected(searchParamSize);
      setPrice(listings.find((l) => l.size === searchParamSize)?.price);
    }
  }, [listings, searchParams]);

  useEffect(() => {
    dispatch(getSneaker(sneakerId));
    dispatch(getListings(sneakerId));
  }, [dispatch, sneakerId]);

  useEffect(() => {
    displayErrors(errors, enqueueSnackbar);
  }, [errors, enqueueSnackbar]);

  const handleSizeSelect = (size) => {
    setSizeSelected(size);
    setPrice(listings.find((l) => l.size === size).price);
  };

  const handlePurchase = () => {
    if (sizeSelected === "Select Size") return;

    dispatch(
      purchaseListing(listings.find((l) => l.size === sizeSelected).id, user.id)
    ).then((res) => {
      navigate("/profile");
    });
  };

  function PriceInfo() {
    return (
      <>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">Market Price:</Typography>
          <Typography variant="h6">
            {price ? `${convertToDisplayPrice(price)}` : "$"}
          </Typography>
        </Box>
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

  function TotalCost() {
    return (
      <>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" fontSize="20px">
            Order Total:
          </Typography>
          <Typography variant="h6" fontSize="20px">
            {price ? `${convertToDisplayPrice(price * 1.05)}` : "$"}
          </Typography>
        </Box>
      </>
    );
  }

  function BuyButton() {
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
            cursor: sizeSelected === "Select Size" ? "not-allowed" : "pointer",
          },
        }}
        onClick={handlePurchase}
      >
        <Typography variant="h6">Purchase</Typography>
      </Box>
    );
  }

  if (!user) return <LogInReminder />;
  if (isLoading) return <Loading />;

  return (
    <Box display="flex" justifyContent="center">
      <Box marginRight="64px" width="600px">
        <Typography variant="h6" fontSize="30px" marginBottom="16px">
          Buy Sneaker
        </Typography>
        <SelectSize
          listings={listings}
          sizeSelected={sizeSelected}
          handleSizeSelect={(size) => handleSizeSelect(size)}
        />
        <Divider sx={{ margin: "16px 0" }} />
        <PriceInfo />
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
          image={jordanObsidian}
          title={`${sneaker.name} ${
            sizeSelected === "Select Size" ? "" : `Size ${sizeSelected}`
          }`}
          price={price ?? ""}
          page="buy"
        />
      </Box>
    </Box>
  );
}

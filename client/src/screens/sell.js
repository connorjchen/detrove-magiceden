import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  useTheme,
  OutlinedInput,
  Divider,
} from "@mui/material";
import ItemCard from "../components/itemCard";
import jordanObsidian from "../images/jordanObsidian.jpg"; // remove to be dynamic with data
import { SelectSize } from "../components/selectSize";
import {
  getUnlistedItems,
  getSneaker,
  createListing,
} from "../redux/actions/sellActions";
import { displayErrors, convertToDisplayPrice } from "../utils/utils.js";
import { RequestsEnum } from "../redux/helpers/requestsEnum";
import { getLoadingAndErrors } from "../redux/helpers/requestsSelectors";
import { useSnackbar } from "notistack";
import Loading from "../components/loading";
import LogInReminder from "../components/logInReminder";

export default function Sell() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const { sneakerId } = useParams();
  const { sneaker, unlistedItems } = useSelector((state) => state.sell);
  const { user } = useSelector((state) => state.profile);
  const { isLoading, errors } = useSelector((state) =>
    getLoadingAndErrors(state, [
      RequestsEnum.profileGetUser,
      RequestsEnum.sellGetSneaker,
      RequestsEnum.sellGetUnlistedItems,
    ])
  );
  const [itemSelected, setItemSelected] = useState(null);
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (searchParams.get("size")) {
      const searchParamSize = Number(searchParams.get("size"));
      setItemSelected(
        unlistedItems.find((item) => item.size === searchParamSize)
      );
    }
  }, [searchParams, unlistedItems]);

  useEffect(() => {
    if (!user) return;

    dispatch(getSneaker(sneakerId));
    dispatch(getUnlistedItems(user.id, sneakerId));
  }, [dispatch, sneakerId, user]);

  useEffect(() => {
    displayErrors(errors, enqueueSnackbar);
  }, [errors, enqueueSnackbar]);

  const handleCreateListing = () => {
    if (!itemSelected) return;

    dispatch(createListing(itemSelected.id, user.id, price)).then((res) => {
      navigate("/profile");
    });
  };

  const handleSizeSelect = (size) => {
    setItemSelected(unlistedItems.find((item) => item.size === size));
  };

  function renderPriceInput() {
    return (
      <Box>
        <Typography variant="h6">Price</Typography>
        <OutlinedInput
          value={price}
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          startAdornment={<Typography variant="h6">$</Typography>}
          placeholder="Price"
          sx={{
            ...theme.inputAnimation,
            height: "48px",
            width: "100%",
          }}
        />
      </Box>
    );
  }

  function FeesInfo() {
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

  function TotalIncome() {
    return (
      <>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" fontSize="20px">
            Total Income:
          </Typography>
          <Typography variant="h6" fontSize="20px">
            {price ? `${convertToDisplayPrice(price * 0.95)}` : "$"}
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
            cursor: itemSelected ? "pointer" : "not-allowed",
          },
        }}
        onClick={handleCreateListing}
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
          Sell Sneaker
        </Typography>
        <SelectSize
          listings={unlistedItems}
          sizeSelected={itemSelected ? itemSelected.size : "Select Size"}
          handleSizeSelect={(size) => handleSizeSelect(size)}
        />
        <Divider sx={{ margin: "16px 0" }} />
        {renderPriceInput()}
        <Divider sx={{ margin: "16px 0" }} />
        <FeesInfo />
        <Divider sx={{ margin: "16px 0" }} />
        <TotalIncome />
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
            itemSelected ? `Size ${itemSelected.size}` : ""
          }`}
          price={price ?? ""}
          page="sell"
        />
      </Box>
    </Box>
  );
}

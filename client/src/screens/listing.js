import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
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
import ItemCard from "../components/itemCard";
import jordanObsidian from "../images/jordanObsidian.jpg"; // remove to be dynamic with data
import { SelectSize } from "../components/selectSize";
import { getListing, updateListing } from "../redux/actions/listingActions";
import { displayErrors, convertToDisplayPrice } from "../utils/utils.js";
import { RequestsEnum } from "../redux/helpers/requestsEnum";
import { getLoadingAndErrors } from "../redux/helpers/requestsSelectors";
import { useSnackbar } from "notistack";
import Loading from "../components/loading";

export default function Listing() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { listingId } = useParams();
  const { listing } = useSelector((state) => state.listing);
  const { isLoading, errors } = useSelector((state) =>
    getLoadingAndErrors(state, [RequestsEnum.listingGetListing])
  );
  const [price, setPrice] = useState("");

  useEffect(() => {
    dispatch(getListing(listingId));
  }, [dispatch]);

  useEffect(() => {
    if (listing) {
      setPrice(listing.price);
    }
  }, [listing]);

  useEffect(() => {
    displayErrors(errors, enqueueSnackbar);
  }, [errors, displayErrors, enqueueSnackbar]);

  const handleUpdateListing = (isDeleted) => {
    dispatch(updateListing(listingId, price, isDeleted)).then((res) => {
      navigate("/profile");
    });
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

  function TotalIncome({}) {
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

  function UpdateButton({}) {
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
            cursor: "pointer",
          },
        }}
        onClick={() => handleUpdateListing(false)}
      >
        <Typography variant="h6">Update Listing</Typography>
      </Box>
    );
  }

  function DeleteButton({}) {
    return (
      <Box
        sx={{
          ...theme.basicButton,
          height: "48px",
          backgroundColor: theme.palette.error.main,
          color: theme.palette.primary.main,
          marginTop: "32px",
          "&:hover": {
            backgroundColor: theme.palette.error.hover,
            cursor: "pointer",
          },
        }}
        onClick={() => handleUpdateListing(true)}
      >
        <Typography variant="h6">Delete Listing</Typography>
      </Box>
    );
  }

  if (isLoading) return <Loading />;

  return (
    <Box display="flex" justifyContent="center">
      <Box marginRight="64px" width="600px">
        <Typography variant="h6" fontSize="30px" marginBottom="16px">
          Update Listing
        </Typography>
        {renderPriceInput()}
        <Divider sx={{ margin: "16px 0" }} />
        <FeesInfo />
        <Divider sx={{ margin: "16px 0" }} />
        <TotalIncome />
        <UpdateButton />
        <DeleteButton />
      </Box>
      <Box>
        <Typography variant="h6" marginBottom="16px">
          Preview
        </Typography>
        <ItemCard
          address={1}
          image={jordanObsidian}
          title={`${listing.name} ${listing.size}`}
          price={price ?? ""}
          page="sell"
        />
      </Box>
    </Box>
  );
}

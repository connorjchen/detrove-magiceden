import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, Link, useParams } from "react-router-dom";
import { Box, Typography, useTheme, Grid } from "@mui/material";
import ContentBox from "../components/contentBox";
import LineGraph from "../components/linegraph";
import {
  getSneaker,
  getListings,
  getIsWatchlistItem,
  createWatchlistItem,
  deleteWatchlistItem,
} from "../redux/actions/productActions";
import { displayErrors, convertToDisplayPrice } from "../utils/utils.js";
import { RequestsEnum } from "../redux/helpers/requestsEnum";
import { getLoadingAndErrors } from "../redux/helpers/requestsSelectors";
import { useSnackbar } from "notistack";
import Loading from "../components/loading";
import { SelectSize } from "../components/selectSize";
import { s3Object } from "../redux/constants";
import {
  StarBorder as StarBorderIcon,
  Star as StarIcon,
} from "@material-ui/icons";

export default function Product() {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [params, setParams] = useState({});
  const { sneakerId } = useParams();
  const { sneaker, listings, isWatchlistItem } = useSelector(
    (state) => state.product
  );
  const { user } = useSelector((state) => state.profile);
  const { isLoading, errors } = useSelector((state) =>
    getLoadingAndErrors(state, [
      RequestsEnum.productGetSneaker,
      RequestsEnum.productGetListings,
      RequestsEnum.productGetIsWatchlistItem,
    ])
  );
  const [sizeSelected, setSizeSelected] = useState("Select Size");
  const [price, setPrice] = useState("");

  useEffect(() => {
    dispatch(getSneaker(sneakerId));
    dispatch(getListings(sneakerId));

    if (!user) return;
    dispatch(getIsWatchlistItem(user.id, sneakerId));
  }, [dispatch, user, sneakerId]);

  useEffect(() => {
    displayErrors(errors, enqueueSnackbar);
  }, [errors, enqueueSnackbar]);

  const handleSizeSelect = (size) => {
    setSizeSelected(size);
    setParams({ ...params, size });
    setPrice(listings.find((l) => l.size === size)?.price);
  };

  const ItemLabels = ({ sneaker }) => {
    const labelsToDisplay = [
      { label: "Name", value: sneaker.name },
      { label: "Gender", value: sneaker.gender },
      { label: "Colorway", value: sneaker.colorway },
      {
        label: "Release Date",
        value: new Date(sneaker.release_date).toLocaleDateString(),
      },
      {
        label: "Retail Price",
        value: convertToDisplayPrice(sneaker.retail_price),
      },
      { label: "Style Code", value: sneaker.style_code },
    ];

    return (
      <>
        {labelsToDisplay.map(({ label, value }, i) => (
          <Grid item xs={2} key={i} textAlign="center">
            <Box margin="16px 0">
              <Typography variant="h6">{label}</Typography>
              <Typography variant="h6" fontWeight="normal">
                {value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </>
    );
  };

  const WatchListButton = () => {
    if (!user) return null;

    if (!isWatchlistItem) {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            cursor: "pointer",
          }}
          onClick={() => dispatch(createWatchlistItem(user.id, sneakerId))}
        >
          <StarBorderIcon style={{ color: theme.palette.gold.main }} />
          <Typography variant="h6" fontSize="14px" fontWeight="normal">
            Add to Watchlist
          </Typography>
        </Box>
      );
    } else {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            cursor: "pointer",
          }}
          onClick={() => dispatch(deleteWatchlistItem(user.id, sneakerId))}
        >
          <StarIcon style={{ color: theme.palette.gold.main }} />
          <Typography variant="h6" fontSize="14px" fontWeight="normal">
            Remove from Watchlist
          </Typography>
        </Box>
      );
    }
  };

  if (isLoading) return <Loading />;

  return (
    <Box display="flex" justifyContent="center">
      <Grid container spacing="16px" width="1200px">
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" fontSize="24px">
            {sneaker.name}
          </Typography>
          <WatchListButton />
        </Grid>
        <Grid item xs={8}>
          <LineGraph />
        </Grid>
        <Grid item xs={4}>
          <Box marginLeft="48px">
            <Box
              component="img"
              src={s3Object(sneaker.id)}
              width="100%"
              borderRadius="16px"
            />
            <SelectSize
              listings={listings}
              sizeSelected={sizeSelected}
              handleSizeSelect={(size) => handleSizeSelect(size)}
            />
            <Link
              to={`/buy/${sneakerId}?${createSearchParams(params)}`}
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
              >
                <Typography variant="h6">
                  Checkout {price ? convertToDisplayPrice(price) : ""}
                </Typography>
              </Box>
            </Link>
          </Box>
        </Grid>
        <ItemLabels sneaker={sneaker} />
        <Grid item xs={12}>
          <ContentBox
            title="About"
            content={
              <Typography variant="h6" fontWeight="normal">
                {sneaker.description}
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <ContentBox
            title="Information"
            content={
              <Typography variant="h6" fontWeight="normal">
                Any sneaker issued by Detrove is redeemable for its physical
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

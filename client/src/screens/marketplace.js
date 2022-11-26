import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme, Grid, Typography } from "@mui/material";
import { getListings } from "../redux/actions/marketplaceActions";
import { getLoadingAndErrors } from "../redux/helpers/requestsSelectors";
import { useSnackbar } from "notistack";
import {
  filterAndSortMarketplaceListings,
  displayErrors,
} from "../utils/utils.js";
import { RequestsEnum } from "../redux/helpers/requestsEnum";
import SortByFilter from "../components/sortByFilter";
import FiltersBar from "../components/filtersBar";
import ItemCard from "../components/itemCard";
import jordanObsidian from "../images/jordanObsidian.jpg"; // remove to be dynamic with data
import Loading from "../components/loading";

// make state defaults like default optionsSelected or default sizes to reference up here

export default function Marketplace() {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { listings } = useSelector((state) => state.marketplace);
  const { isLoading, errors } = useSelector((state) =>
    getLoadingAndErrors(state, [RequestsEnum.marketplaceGetListings])
  );
  const [optionsSelected, setOptionsSelected] = useState([[], []]);
  const [forSaleOnly, setForSaleOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Price: Low to High");
  const [priceRange, setPriceRange] = useState(["", ""]);
  const [filterOptions, setFilterOptions] = useState([[], []]);
  const [filteredSortedListings, setFilteredSortedListings] = useState([]);
  const sortByOptions = ["Price: Low to High", "Price: High to Low"];

  useEffect(() => {
    dispatch(getListings());
  }, [dispatch]);

  useEffect(() => {
    displayErrors(errors, enqueueSnackbar);
  }, [errors, enqueueSnackbar]);

  useEffect(() => {
    if (!listings) return;

    setFilterOptions([
      Array.from(new Set(listings.map((listing) => listing.brand))).sort(),
      Array.from(
        new Set(
          listings.reduce((acc, listing) => {
            return [...acc, ...listing.listings.map((listing) => listing.size)];
          }, [])
        )
      ).sort(),
    ]);
  }, [listings]);

  useEffect(() => {
    setFilteredSortedListings(
      filterAndSortMarketplaceListings(
        listings,
        optionsSelected,
        forSaleOnly,
        sortBy,
        priceRange
      )
    );
  }, [listings, optionsSelected, forSaleOnly, sortBy, priceRange]);

  const clearFilters = () => {
    setOptionsSelected([[], []]);
    setForSaleOnly(false);
    setPriceRange(["", ""]);
  };

  if (isLoading) return <Loading />;

  return (
    <Box display="flex">
      <FiltersBar
        clearFilters={clearFilters}
        options={filterOptions}
        optionsSelected={optionsSelected}
        setOptionsSelected={setOptionsSelected}
        forSaleOnly={forSaleOnly}
        setForSaleOnly={setForSaleOnly}
        setPriceRange={setPriceRange}
      />
      <Box width="100%">
        <Box
          display="flex"
          marginBottom="16px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" fontSize="30px">
            Marketplace
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" marginRight="16px">
              {filteredSortedListings.length}{" "}
              {filteredSortedListings.length === 1 ? "item" : "items"}
            </Typography>
            <SortByFilter
              sortBy={sortBy}
              setSortBy={setSortBy}
              options={sortByOptions}
            />
          </Box>
        </Box>
        {filteredSortedListings.length === 0 ? (
          <Box
            borderRadius="16px"
            border={`1px solid ${theme.palette.secondary.outline}`}
            height="400px"
            display="flex"
          >
            <Typography
              variant="h6"
              fontSize="30px"
              fontWeight="normal"
              margin="auto"
            >
              No items to display
            </Typography>
          </Box>
        ) : (
          <Grid container spacing="32px">
            {filteredSortedListings.map((listing, idx) => (
              <Grid item key={idx} xs={12} sm={6} md={4} lg={3} xl={2.4}>
                <ItemCard
                  sneakerId={listing.id}
                  image={jordanObsidian}
                  title={listing.name}
                  price={listing.listings[0]?.price}
                  page="marketplace"
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

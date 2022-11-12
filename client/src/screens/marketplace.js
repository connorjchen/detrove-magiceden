import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme, Grid, Typography } from "@mui/material";
import { getListings } from "../redux/actions/marketplaceActions";
import {
  namedRequestsInProgress,
  namedRequestError,
} from "../redux/helpers/requestsSelectors";
import { RequestsEnum } from "../redux/helpers/requestsEnum";
import SortByFilter from "../components/sortByFilter";
import FiltersBar from "../components/filtersBar";
import ItemCard from "../components/itemCard";
import hermesSneaker from "../images/hermesSneaker.jpg"; // remove to be dynamic with data

export default function Marketplace() {
  const theme = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListings());
  }, [dispatch]);

  const { listings } = useSelector((state) => state.marketplace);
  const [isLoading, error] = useSelector((state) => [
    namedRequestsInProgress(state, RequestsEnum.marketplaceGetListings),
    namedRequestError(state, RequestsEnum.marketplaceGetListings),
  ]);
  console.log(listings, isLoading, error);

  const [optionsSelected, setOptionsSelected] = useState([[]]);
  const [forSaleOnly, setForSaleOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Recently listed");
  const [priceRange, setPriceRange] = useState(["", ""]);

  const filterOptions = [["Hermes", "Jordan", "Yeezy", "Nike", "Adidas"]]; // switch to be dynamic with data
  const sortByOptions = [
    "Recently listed",
    "Price: Low to High",
    "Price: High to Low",
  ];

  const clearFilters = () => {
    setOptionsSelected([[]]);
    setForSaleOnly(false);
    setSortBy("Recently listed");
    setPriceRange(["", ""]);
  };

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
              30 Items
            </Typography>
            <SortByFilter
              sortBy={sortBy}
              setSortBy={setSortBy}
              options={sortByOptions}
            />
          </Box>
        </Box>
        <Grid container spacing="32px">
          {[...Array(30)].map((e, i) => (
            <Grid item key={i} xs={12} sm={6} md={4} lg={3} xl={2.4}>
              <ItemCard
                address={i}
                image={hermesSneaker}
                title={"Hermes Expert Sneaker"}
                price={"100"}
                page="marketplace"
              />
            </Grid>
          ))}
        </Grid>
        {/* <Box
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
        </Box> */}
      </Box>
    </Box>
  );
}

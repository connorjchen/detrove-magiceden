import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme, Grid, Typography } from "@mui/material";
import NavBar from "../components/navBar";
import Footer from "../components/footer";
import { getAllListings } from "../redux/actions/listingActions";
import SortByFilter from "../components/sortByFilter";
import FiltersBar from "../components/filtersBar";
import ItemCard from "../components/itemCard";
import hermesSneaker from "../images/hermesSneaker.jpg"; // remove to be dynamic with data

export default function Marketplace() {
  const theme = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllListings());
  }, [dispatch]);

  const { loading, error, listings } = useSelector((state) => state.listings);
  const [optionsSelected, setOptionsSelected] = useState([[]]);
  const [forSaleOnly, setForSaleOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Recently listed");
  const [priceRange, setPriceRange] = useState(["", ""]);

  const filterOptionValues = [["Hermes", "Jordan", "Yeezy", "Nike", "Adidas"]]; // switch to be dynamic with data

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
        filterOptionValues={filterOptionValues}
        optionsSelected={optionsSelected}
        setOptionsSelected={setOptionsSelected}
        forSaleOnly={forSaleOnly}
        setForSaleOnly={setForSaleOnly}
        setPriceRange={setPriceRange}
      />
      <Box>
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
            <SortByFilter sortBy={sortBy} setSortBy={setSortBy} />
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
                isMarketplace={true}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

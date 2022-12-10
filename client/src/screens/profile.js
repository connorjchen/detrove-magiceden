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
import { getListing } from "../redux/actions/listingActions";
import ItemCard from "../components/itemCard";
import hermesSneaker from "../images/hermesSneaker.jpg"; // remove to be dynamic with data
import solanaIcon from "../images/solanaIcon.png";
import SortByFilter from "../components/sortByFilter";
import FiltersBar from "../components/filtersBar";
import { Search as SearchIcon } from "@mui/icons-material";

export default function Profile() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [optionsSelected, setOptionsSelected] = useState([[]]);
  const [forSaleOnly, setForSaleOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Recently listed");
  const [priceRange, setPriceRange] = useState(["", ""]);
  const [searchTerm, setSearchTerm] = useState("");

  const filterOptionValues = [["Hermes", "Jordan", "Yeezy", "Nike", "Adidas"]]; // switch to be dynamic with data

  const clearFilters = () => {
    setOptionsSelected([[]]);
    setForSaleOnly(false);
    setSortBy("Recently listed");
    setPriceRange(["", ""]);
  };

  return (
    <Box>
      <Typography variant="h6" fontSize="30px">
        Furiousity
      </Typography>
      <Box display="flex" alignItems="center">
        <Box component="img" src={solanaIcon} width="16px" marginRight="8px" />
        <Typography variant="h6" fontWeight="normal">
          APUEC6...bQmb
        </Typography>
      </Box>
      <Box margin="32px 0">
        <Grid container spacing="32px">
          <Grid item xs={8}>
            <Box
              borderRadius="16px"
              border={`1px solid ${theme.palette.secondary.outline}`}
              height="400px"
            >
              Robinhood Graph
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              borderRadius="16px"
              border={`1px solid ${theme.palette.secondary.outline}`}
              height="400px"
            >
              Watchlist
            </Box>
          </Grid>
        </Grid>
      </Box>
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
            <OutlinedInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startAdornment={
                <SearchIcon sx={{ color: theme.palette.secondary.bold }} />
              }
              placeholder="Search"
              sx={{
                ...theme.inputAnimation,
                height: "48px",
                width: "100%",
                marginRight: "32px",
              }}
            />
            <SortByFilter sortBy={sortBy} setSortBy={setSortBy} />
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
    </Box>
  );
}

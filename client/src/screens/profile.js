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
import SortByFilter from "../components/sortByFilter";
import FiltersBar from "../components/filtersBar";
import { Search as SearchIcon } from "@mui/icons-material";
import LineGraph from "../components/linegraph";

export default function Profile() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [optionsSelected, setOptionsSelected] = useState([[]]);
  const [forSaleOnly, setForSaleOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Recently received");
  const [priceRange, setPriceRange] = useState(["", ""]);
  const [searchTerm, setSearchTerm] = useState("");

  const filterOptions = [["Hermes", "Jordan", "Yeezy", "Nike", "Adidas"]]; // switch to be dynamic with data
  const sortByOptions = [
    "Recently received",
    "Recently listed",
    "Price: Low to High",
    "Price: High to Low",
  ];
  const watchlistOptions = [
    ["Hermes Expert Sneaker", hermesSneaker, "100"],
    ["Hermes Expert Sneaker", hermesSneaker, "100"],
    ["Hermes Expert Sneaker", hermesSneaker, "100"],
    ["Hermes Expert Sneaker", hermesSneaker, "100"],
    ["Hermes Expert Sneaker", hermesSneaker, "100"],
    ["Hermes Expert Sneaker", hermesSneaker, "100"],
    ["Hermes Expert Sneaker", hermesSneaker, "100"],
    ["Hermes Expert Sneaker", hermesSneaker, "100"],
  ];

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
        <Grid container rowSpacing="16px" columnSpacing="64px">
          <Grid item xs={8}>
            <LineGraph />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">Watchlist</Typography>
            <Box height="400px" overflow="auto">
              {watchlistOptions.map(([title, image, price], i) => (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  padding="8px"
                >
                  <Box
                    component="img"
                    src={image}
                    alt="image"
                    width="48px"
                    borderRadius="10px"
                    marginRight="16px"
                  />
                  <Typography
                    variant="h6"
                    fontSize="14px"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="h6"
                    fontSize="14px"
                    flex="1"
                    textAlign="right"
                    whiteSpace="nowrap"
                    marginLeft="16px"
                  >{`${price.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )} SOL`}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
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
            <Box display="flex" alignItems="center">
              <Typography variant="h6" marginRight="16px" whiteSpace="nowrap">
                5 Items
              </Typography>
              <SortByFilter
                sortBy={sortBy}
                setSortBy={setSortBy}
                options={sortByOptions}
              />
            </Box>
          </Box>
          <Grid container spacing="32px">
            {[...Array(5)].map((e, i) => (
              <Grid item key={i} xs={12} sm={6} md={4} lg={3} xl={2.4}>
                <ItemCard
                  address={i}
                  image={hermesSneaker}
                  title={"Hermes Expert Sneaker"}
                  price={undefined}
                  page="profile"
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
    </Box>
  );
}

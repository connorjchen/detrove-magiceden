import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  useTheme,
  Grid,
  OutlinedInput,
  Tabs,
  Tab,
} from "@mui/material";
import ItemCard from "../components/itemCard";
import SortByFilter from "../components/sortByFilter";
import FiltersBar from "../components/filtersBar";
import { Search as SearchIcon } from "@mui/icons-material";
import LineGraph from "../components/linegraph";
import { convertToDisplayPrice } from "../utils/utils";
import {
  getActiveListings,
  getItems,
  getUser,
} from "../redux/actions/profileActions";
import { getLoadingAndErrors } from "../redux/helpers/requestsSelectors";
import { useSnackbar } from "notistack";
import { filterAndSortProfileItems, displayErrors } from "../utils/utils.js";
import { RequestsEnum } from "../redux/helpers/requestsEnum";
import Loading from "../components/loading";
import LogInReminder from "../components/logInReminder";
import { s3Object } from "../redux/constants";

export default function Profile() {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, items, activeListings } = useSelector((state) => state.profile);
  const { isLoading, errors } = useSelector((state) =>
    getLoadingAndErrors(state, [
      RequestsEnum.profileGetUser,
      RequestsEnum.profileGetItems,
      RequestsEnum.profileGetActiveListings,
    ])
  );
  const [optionsSelected, setOptionsSelected] = useState([[], []]);
  const [forSaleOnly, setForSaleOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Price: Low to High");
  const [priceRange, setPriceRange] = useState(["", ""]);
  const [filterOptions, setFilterOptions] = useState([[], []]);
  const [filteredSortedItems, setFilteredSortedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tab, setTab] = useState("items");
  const sortByOptions = ["Price: Low to High", "Price: High to Low"];

  useEffect(() => {
    if (!user) return;

    dispatch(getUser(user.email));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!user) return;

    dispatch(getItems(user.id));
    dispatch(getActiveListings(user.id));
  }, [user, dispatch]);

  useEffect(() => {
    displayErrors(errors, enqueueSnackbar);
  }, [errors, enqueueSnackbar]);

  useEffect(() => {
    if (!items) return;
    setFilterOptions([
      Array.from(new Set(items.map((item) => item.brand))).sort(),
      Array.from(new Set(items.map((item) => item.size))).sort((a, b) => a - b),
    ]);
  }, [items]);

  useEffect(() => {
    setFilteredSortedItems(
      filterAndSortProfileItems(
        items,
        optionsSelected,
        forSaleOnly,
        sortBy,
        priceRange,
        searchTerm
      )
    );
  }, [items, optionsSelected, forSaleOnly, sortBy, priceRange, searchTerm]);

  const clearFilters = () => {
    setOptionsSelected([[], []]);
    setForSaleOnly(false);
    setPriceRange(["", ""]);
  };

  const switchTabs = (tab) => {
    setTab(tab);
    clearFilters();
  };

  if (!user) return <LogInReminder />;

  if (isLoading) return <Loading />;

  const renderItemsTab = () => {
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
                {filteredSortedItems.length}{" "}
                {filteredSortedItems.length === 1 ? "item" : "items"}
              </Typography>
              <SortByFilter
                sortBy={sortBy}
                setSortBy={setSortBy}
                options={sortByOptions}
              />
            </Box>
          </Box>
          {filteredSortedItems.length === 0 ? (
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
              {filteredSortedItems.map((item, idx) => (
                <Grid item key={idx} xs={12} sm={6} md={4} lg={3} xl={2.4}>
                  <ItemCard
                    sneakerId={item.sneaker_id}
                    image={s3Object(item.sneaker_id)}
                    title={`${item.name} Size ${item.size}`}
                    price={item.price}
                    page="profile"
                    sneakerSize={item.size}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    );
  };

  const renderActiveListingsTab = () => {
    return (
      <>
        {activeListings.length === 0 ? (
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
              No listings to display
            </Typography>
          </Box>
        ) : (
          <>
            {activeListings.map((listing, idx) => {
              return (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  padding="8px"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    onClick={() => navigate(`/product/${listing.sneaker_id}`)}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      component="img"
                      src={s3Object(listing.sneaker_id)}
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
                      {`${listing.name} Size ${listing.size}`}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      flex="1"
                      textAlign="right"
                      whiteSpace="nowrap"
                      marginRight="16px"
                    >
                      {convertToDisplayPrice(listing.price)}
                    </Typography>
                    <Box
                      sx={{
                        ...theme.basicButton,
                        height: "48px",
                        backgroundColor: theme.palette.accent.dark,
                        color: theme.palette.primary.main,
                        "&:hover": {
                          backgroundColor: theme.palette.accent.hover,
                          cursor: "pointer",
                        },
                      }}
                      onClick={() => navigate(`/listing/${listing.id}`)}
                    >
                      <Typography variant="h6">Edit Listing</Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </>
        )}
      </>
    );
  };

  return (
    <Box>
      <Typography variant="h6" fontSize="30px">
        {user.email}
      </Typography>
      <Grid container rowSpacing="16px" columnSpacing="64px">
        <Grid item xs={8}>
          <LineGraph tempPrice={convertToDisplayPrice(user.balance)} />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">Watchlist</Typography>
          <Box height="400px" overflow="auto">
            {/* {watchlistOptions.map(([title, image, price], i) => (
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
                  >
                    {convertToDisplayPrice(price)}
                  </Typography>
                </Box>
              ))} */}
            <Box
              borderRadius="16px"
              border={`1px solid ${theme.palette.secondary.outline}`}
              display="flex"
              height="100%"
            >
              <Typography
                variant="h6"
                fontSize="30px"
                fontWeight="normal"
                margin="auto"
              >
                Coming Soon
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box margin="32px 0">
        <Tabs
          textColor="inherit"
          value={tab}
          onChange={(_, tab) => switchTabs(tab)}
          TabIndicatorProps={{
            style: {
              backgroundColor: "black",
            },
          }}
        >
          <Tab label="Items" value="items" />
          <Tab label="Active Listings" value="activeListings" />
        </Tabs>
      </Box>
      {tab === "items" ? renderItemsTab() : renderActiveListingsTab()}
    </Box>
  );
}

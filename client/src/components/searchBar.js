import React, { useState, useEffect } from "react";
import { OutlinedInput, useTheme, Fade, Box, Typography } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import jordanObsidian from "../images/jordanObsidian.jpg";
import { displayErrors } from "../utils/utils.js";
import { getSneakers } from "../redux/actions/searchActions";
import { RequestsEnum } from "../redux/helpers/requestsEnum";
import { getLoadingAndErrors } from "../redux/helpers/requestsSelectors";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import Loading from "./loading";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { sneakers } = useSelector((state) => state.search);
  const { isLoading, errors } = useSelector((state) =>
    getLoadingAndErrors(state, [RequestsEnum.searchGetSneakers])
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    dispatch(getSneakers());
  }, [dispatch]);

  useEffect(() => {
    displayErrors(errors, enqueueSnackbar);
  }, [errors, displayErrors, enqueueSnackbar]);

  useEffect(() => {
    if (sneakers) {
      setSearchResults(
        sneakers.filter((sneaker) =>
          sneaker.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [sneakers, searchTerm]);

  if (isLoading) return <Loading />;

  return (
    <Box width="100%" maxWidth="700px" marginRight="32px">
      <OutlinedInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        startAdornment={
          <SearchIcon sx={{ color: theme.palette.secondary.bold }} />
        }
        placeholder="Search"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          if (e.relatedTarget && e.relatedTarget.tagName === "A") {
            e.relatedTarget.click();
            setIsFocused(false);
            setSearchTerm("");
          } else {
            setIsFocused(false);
          }
        }}
        sx={{
          ...theme.inputAnimation,
          height: "48px",
          width: "100%",
        }}
      />
      <Fade in={isFocused} timeout={{ enter: 225, exit: 0 }}>
        <Box
          sx={{
            ...theme.dropdownBox,
            top: "216px",
            marginTop: "-208px",
          }}
        >
          {searchResults.slice(0, 3).map(({ id, name, image }, i) => (
            <Link
              key={i}
              to={`/product/${id}`}
              style={{
                textDecoration: "none",
                color: theme.palette.tertiary.main,
              }}
            >
              <Box
                sx={{
                  ...theme.dropdownOption,
                  justifyContent: "normal",
                }}
              >
                <Box
                  component="img"
                  src={jordanObsidian}
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
                  {name}
                </Typography>
              </Box>
            </Link>
          ))}
        </Box>
      </Fade>
    </Box>
  );
}

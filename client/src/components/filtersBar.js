import React, { useState } from "react";
import {
  Box,
  OutlinedInput,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Switch,
  useTheme,
  Accordion,
  AccordionSummary,
  Divider,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

export default function FiltersBar({
  clearFilters,
  filterOptionValues,
  optionsSelected,
  setOptionsSelected,
  forSaleOnly,
  setForSaleOnly,
  setPriceRange,
}) {
  const theme = useTheme();

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  function ClearFiltersButton({ clearFilters }) {
    return (
      <Box
        sx={{
          ...theme.basicButton,
          height: "48px",
          marginBottom: "16px",
        }}
        onClick={() => clearFilters()}
      >
        <Typography variant="h6">Clear Filters</Typography>
      </Box>
    );
  }

  function renderCheckListFilter(label, options, selectOption, idx) {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            "& .MuiAccordionSummary-expandIconWrapper": {
              margin: "5px",
            },
          }}
        >
          <Typography variant="h6">{label}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {options.map((option, i) => (
              <FormControlLabel
                key={i}
                control={
                  <Checkbox
                    onClick={() => selectOption(option, idx)}
                    checked={optionsSelected[idx].includes(option)}
                    disableRipple={true}
                  />
                }
                label={
                  <Typography
                    variant="h6"
                    fontSize="14px"
                    color={theme.palette.tertiary.main}
                  >
                    {option}
                  </Typography>
                }
                sx={{
                  margin: 0,
                }}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    );
  }

  function renderPriceFilter() {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            "& .MuiAccordionSummary-expandIconWrapper": {
              margin: "5px",
            },
          }}
        >
          <Typography variant="h6">Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" justifyContent="center" alignItems="center">
            <OutlinedInput
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min"
              sx={{
                ...theme.inputAnimation,
                height: "48px",
              }}
            />
            <Typography
              variant="subtitle1"
              color={theme.palette.secondary.bold}
              margin="0 8px"
            >
              to
            </Typography>
            <OutlinedInput
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max"
              sx={{
                ...theme.inputAnimation,
                height: "48px",
              }}
            />
          </Box>
          <Box
            sx={{
              ...theme.basicButton,
              margin: "16px 0",
              height: "48px",
            }}
            onClick={() => setPriceRange([minPrice, maxPrice])}
          >
            <Typography variant="h6">Apply</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  }

  function renderSwitch() {
    return (
      <FormControlLabel
        control={
          <Switch
            onClick={() => setForSaleOnly(!forSaleOnly)}
            checked={forSaleOnly}
          />
        }
        label={<Typography variant="h6">For Sale Only</Typography>}
        labelPlacement="start"
        sx={{
          margin: 0,
          height: "57px",
        }}
      />
    );
  }

  function selectOption(option, i) {
    let newOptionsSelected = [...optionsSelected];
    if (optionsSelected[i].includes(option)) {
      newOptionsSelected[i] = optionsSelected[i].filter((o) => o !== option);
    } else {
      newOptionsSelected[i] = [...optionsSelected[i], option];
    }
    setOptionsSelected(newOptionsSelected);
  }

  return (
    <Box
      sx={{
        minWidth: "250px",
        height: "calc(100vh - 162px)",
        position: "sticky",
        top: "80px",
        overflowY: "auto",
        marginRight: "32px",
      }}
    >
      <ClearFiltersButton clearFilters={clearFilters} />
      {renderCheckListFilter("Brand", filterOptionValues[0], selectOption, 0)}
      <Divider />
      {renderPriceFilter()}
      <Divider />
      {renderSwitch()}
    </Box>
  );
}

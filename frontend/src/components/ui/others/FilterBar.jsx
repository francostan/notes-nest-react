import React, { useState } from "react";
import {
  FormControl,
  Box,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const FilterBar = ({ setSearch, search, notes,setPropertyToFilter }) => {
  const [filter, setFilter] = useState("");
  const [options, setOptions] = useState([]);
  const [actives] = useState(["all", "archived", "unarchived"]);

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);

    switch (newFilter) {
      case "tags":
        setOptions([...new Set(notes.map((note) => note.tags).flat())]);
        setPropertyToFilter(newFilter);
        break;
      case "categories":
        setOptions([...new Set(notes.map((note) => note.categories).flat())]);
        setPropertyToFilter(newFilter);
        break;
      case "actives":
        setOptions(actives);
        setPropertyToFilter("active");
        break;
      default:
        setOptions([]);
        setPropertyToFilter("");
        break;
    }
  };

  const handleClearFilters = () => {
    // Restablece los filtros a sus valores iniciales
    setFilter("");
    setSearch("");
    setOptions([]);
  };

  return (
    <Box display="flex" justifyContent="center" my={1}>
      <FormControl style={{ width: "30%", marginRight: "4rem" }}>
        <InputLabel id="filter-type-label">Filter by</InputLabel>
        <Select
          labelId="filter-type-label"
          value={filter}
          onChange={handleFilterChange}
          label="Filter by"
        >
          <MenuItem value="tags">Tags</MenuItem>
          <MenuItem value="categories">Categories</MenuItem>
          <MenuItem value="actives">Actives</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth style={{ width: "30%" }}>
        <InputLabel id="filter-value-label">All options</InputLabel>
        <Select
          labelId="filter-value-label"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          label={`Filter by ${
            filter.charAt(0).toUpperCase() + filter.slice(1)
          }`}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {(filter !== "" || search !== "") && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Close
            onClick={handleClearFilters}
            style={{ cursor: "pointer", marginLeft: "2rem", color: "red" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default FilterBar;

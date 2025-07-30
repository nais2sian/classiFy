import { SelectChangeEvent } from "@mui/material/Select";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SliderPrices } from "../../components/FilterPanel/SliderPrices";
import {
  setCityFilter,
  setFilter,
  setPriceRange,
  type RootState,
} from "../../stores/AdStore";

export function FilterPanel() {
  const dispatch = useDispatch();
  const filterValue = useSelector((state: RootState) => state.filterValue);
  const cityFilter = useSelector((state: RootState) => state.cityFilter);
  const ads = useSelector((state: RootState) => state.ads);

  const cities = ads.map((item) => item.location);
  const resetFilters = () => {
    console.log("ghbdtn");
    dispatch(setCityFilter("all"));
    dispatch(setFilter("all"));
    dispatch(setPriceRange([0, 100]));
  };

  const handleCityFilterChange = (e: SelectChangeEvent<string>) =>
    dispatch(setCityFilter(e.target.value));
  const handleFilterChange = (e: SelectChangeEvent<string>) =>
    dispatch(setFilter(e.target.value));
  return (
    <>
      <Typography>Category</Typography>
      <Select value={filterValue} size="small" onChange={handleFilterChange}>
        <MenuItem value="all">All Categories</MenuItem>
        <MenuItem value="REAL_ESTATE">Real Estate</MenuItem>
        <MenuItem value="AUTO">Auto</MenuItem>
        <MenuItem value="SERVICES">Services</MenuItem>
      </Select>
      <Typography>Price range</Typography>
      <SliderPrices />
      <Typography>City</Typography>
      <Select value={cityFilter} size="small" onChange={handleCityFilterChange}>
        <MenuItem value="all">All Cities</MenuItem>
        {cities.map((item) => (
          <MenuItem value={item}>{item}</MenuItem>
        ))}
      </Select>
      <Button onClick={() => resetFilters()}>Reset all filters</Button>
    </>
  );
}

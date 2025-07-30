import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Stack, Slider, TextField, InputAdornment } from "@mui/material";
import { setPriceRange, RootState } from "../../stores/AdStore";
function valuetext(value: number) {
  return `${value}€`;
}

const minDistance = 10;
const MIN = 10;
const MAX = 1_500_000;
const STEP = 100;

export function SliderPrices() {
  const dispatch = useDispatch();

  const priceRange = useSelector((state: RootState) => state.priceRange);

  const handleChange1 = (
    event: Event,
    newValue: number[],
    activeThumb: number
  ) => {
    if (activeThumb === 0) {
      dispatch(
        setPriceRange([
          Math.min(newValue[0], priceRange[1] - minDistance),
          priceRange[1],
        ])
      );
    } else {
      dispatch(
        setPriceRange([
          priceRange[0],
          Math.max(newValue[1], priceRange[0] + minDistance),
        ])
      );
    }
  };

  const handleInputChange =
    (index: 0 | 1) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = Number(e.target.value);
      const clamped = Math.min(Math.max(raw, MIN), MAX);

      if (index === 0) {
        // editing minimum
        const newMin = Math.min(clamped, priceRange[1] - minDistance);
        dispatch(setPriceRange([newMin, priceRange[1]]));
      } else {
        // editing maximum
        const newMax = Math.max(clamped, priceRange[0] + minDistance);
        dispatch(setPriceRange([priceRange[0], newMax]));
      }
    };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <TextField
          label="Min. price"
          type="number"
          size="small"
          value={priceRange[0]}
          onChange={handleInputChange(0)}
          inputProps={{ min: MIN, max: MAX, step: STEP }}
          InputProps={{
            startAdornment: <InputAdornment position="start">€</InputAdornment>,
          }}
        />
        <TextField
          label="Max. price"
          type="number"
          size="small"
          value={priceRange[1]}
          onChange={handleInputChange(1)}
          inputProps={{ min: MIN, max: MAX, step: STEP }}
          InputProps={{
            startAdornment: <InputAdornment position="start">€</InputAdornment>,
          }}
        />
      </Stack>

      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={priceRange}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={MIN}
        max={MAX}
        step={STEP}
        disableSwap
      />
    </Box>
  );
}

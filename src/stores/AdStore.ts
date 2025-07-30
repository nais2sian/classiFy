import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { type Ad } from "../types";

const adsPerPage = 6;

export interface AdsSliceState {
  ads: Ad[];
  selectedAd?: Ad;
  page: number;
  filterValue: string;
  cityFilter: string; 
  query: string;
  priceRange: number[];
}

const initialState: AdsSliceState = {
  ads: [],
  selectedAd: undefined,
  page: 1,
  filterValue: "all",
  cityFilter: "all",
  query: "",
  priceRange: [0, 100]
};

export const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    addAd(state, action: PayloadAction<Ad>) {
      state.ads.push(action.payload);
    },
    setAds(state, action: PayloadAction<Ad[]>) {
      state.ads = action.payload;
    },
    setSelectedAd(state, action: PayloadAction<Ad | undefined>) {
      state.selectedAd = action.payload;
    },
    setFilter(state, action: PayloadAction<string>) {
      state.filterValue = action.payload;
      state.page = 1;
    },
    setCityFilter(state, action: PayloadAction<string>) {
      state.cityFilter = action.payload;
      state.page = 1;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setPriceRange(state, action) {
      state.priceRange = action.payload
    },
    updateItem: (state, action) => {
      const updated = action.payload;
      const index = state.ads.findIndex((item) => item.id === updated.id);
      if (index !== -1) {
        state.ads[index] = updated;
    }
}

  }
});

export const {
  addAd,
  setAds,
  setSelectedAd,
  setFilter,
  setCityFilter,
  setQuery,
  setPriceRange,
  setPage
} = adsSlice.actions;

export const store = configureStore({
  reducer: adsSlice.reducer
});

export type RootState = ReturnType<typeof store.getState>;

export function useFilteredAds() {
  const query = useSelector((state: RootState) => state.query)
  const filterValue = useSelector((state: RootState) => state.filterValue)
  const ads = useSelector((state: RootState) => state.ads)
  const page = useSelector((state: RootState) => state.page)
  const priceRange = useSelector((state: RootState) => state.priceRange)
  const cityFilter = useSelector((state: RootState) => state.cityFilter)

  const filteredAds = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ads.filter(
      ({ name, type, price, location }) => {
        return (filterValue === "all" || type === filterValue) &&
        (q === "" || name.toLowerCase().includes(q)) &&
        ((price || 0) >= priceRange[0] && (price || 0) <= priceRange[1]) 
        && (cityFilter === "all" || location === cityFilter)

      }
    );
  }, [ads, filterValue, query, priceRange, cityFilter]);

  // slice the filtered list for the current page
  const displayedAds = useMemo(
    () => filteredAds.slice((page - 1) * adsPerPage, page * adsPerPage),
    [filteredAds, page]
  );

  return {
    filteredAds,
    displayedAds,
    totalPages: Math.ceil(filteredAds.length / adsPerPage)
  };
}

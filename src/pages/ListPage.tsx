import { useState } from "react";
import { useSelector } from "react-redux";
import { AdsSliceType } from "../stores/AdStore";
import { CardItem } from "../components/CardItem/CardItem";
import styled from "@emotion/styled";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FilterValue } from "../types";

const adsPerPage = 6;

const ListPage = () => {
  const [filterValue, setFilterValue] = useState<FilterValue>("all");
  const [page, setPage] = useState<number>(1);

  const ads = useSelector((state: AdsSliceType) => state.ads);

  const AdsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  `;

  const filteredAds = ads.filter((ad) => {
    if (filterValue === "all") {
      return true;
    }

    if (ad.type === filterValue) {
      return true;
    }
    // return ad.type === filterValue
    // return filterValue === 'all' || ad.type === filterValue
  });

  const totalPages = Math.ceil(filteredAds.length / adsPerPage);

  const displayedAds = filteredAds.slice(
    (page - 1) * adsPerPage,
    page * adsPerPage
  );

  return (
    <div>
      <h1>Ads Listing</h1>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={filterValue}
        label=""
        onChange={(e) => {
          // set state
          setPage(1);
          setFilterValue(e.target.value);
        }}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="REAL_ESTATE">Real Estate</MenuItem>
        <MenuItem value="AUTO">Auto</MenuItem>
        <MenuItem value="SERVICES">Services</MenuItem>
      </Select>
      <AdsGrid id="ads">
        {ads.length ? (
          displayedAds.map((ad) => {
            return <CardItem ad={ad} key={ad.name + ad.id} />;
          })
        ) : (
          <p>Loading ads...</p>
        )}
      </AdsGrid>
      {page > 1 && <button onClick={() => setPage(page - 1)}>Prev</button>}
      Page {page} of {totalPages}
      {page < totalPages && (
        <button onClick={() => setPage(page + 1)}>Next</button>
      )}
    </div>
  );
};

export default ListPage;

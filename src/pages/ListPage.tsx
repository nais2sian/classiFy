import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { AdsSliceType } from "../stores/AdStore";
import { CardItem } from "../components/CardItem/CardItem";
import styled from "@emotion/styled";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Menu } from "../components/layout/Menu";
import { FilterValue } from "../types";
import { CircularIndeterminate } from "../components/layout/Loader";
import { Box, Button, Typography } from "@mui/material";

const adsPerPage = 6;

const ListPage = () => {
  const [filterValue, setFilterValue] = useState<FilterValue>("all");
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

  const ads = useSelector((state: AdsSliceType) => state.ads);

  const AdsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  `;

  /* --- фильтрация и пагинация --- */
  const filteredAds = useMemo(() => {
    const q = query.trim().toLowerCase();

    return ads.filter((ad) => {
      const passesType = filterValue === "all" || ad.type === filterValue;

      const passesQuery = q === "" || ad.name.toLowerCase().includes(q);

      return passesType && passesQuery;
    });
  }, [ads, filterValue, query]);

  const totalPages = Math.ceil(filteredAds.length / adsPerPage);

  const displayedAds = filteredAds.slice(
    (page - 1) * adsPerPage,
    page * adsPerPage
  );

  /* --- сбрасываем страницу, если изменился фильтр или поиск --- */
  useEffect(() => {
    setPage(1);
  }, [filterValue, query]);

  /* --- коллбэк, который получит SearchBar --- */
  const handleSearch = (q: string) => {
    setQuery(q); // всё! SearchBar ни о чём больше не знает
  };

  return (
    <div>
      <Menu onSearch={handleSearch} />
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

      {/* либо сетка с карточками, либо лоадер */}
      {ads.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 240, // чтобы спиннер не "прилип" к заголовку
          }}
        >
          <CircularIndeterminate />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            mt: 4,
          }}
        >
          <AdsGrid id="ads">
            {displayedAds.map((ad) => (
              <CardItem ad={ad} key={ad.id} />
            ))}
          </AdsGrid>
          {/* Пагинация в одну строку */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              margin: "30px",
            }}
          >
            <Button
              variant="outlined"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </Button>

            <Typography>
              Page {page} of {totalPages}
            </Typography>

            <Button
              variant="outlined"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default ListPage;

import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { Menu } from "../components/layout/Menu";
import { AdsSection } from "../components/AdsSection";
import { setQuery } from "../stores/AdStore";
import { Grid } from "@mui/material";
import { FilterPanel } from "../components/FilterPanel/FilterPanel";

const ListPage = () => {
  const dispatch = useDispatch();
  const handleSearch = (q: string) => dispatch(setQuery(q));

  return (
    <>
      <Menu onSearch={handleSearch} />

      <Grid container spacing={4}>
        <Grid
          size={{
            xs: 12,
            md: 3,
          }}
        >
          <Box
            sx={{
              width: "100%",
              flexShrink: 0,
              flexDirection: "column",
              display: "flex",
              px: 2,
              pt: 2,
              bgcolor: "white",
              borderRadius: 2,
              p: 2,
              mt: 4,
              gap: 2,
            }}
          >
            <FilterPanel />
          </Box>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 9,
          }}
        >
          <AdsSection />
        </Grid>
      </Grid>
    </>
  );
};

export default ListPage;

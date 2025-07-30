import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";

import { setPage, type RootState, useFilteredAds } from "../stores/AdStore";
import { CardItem } from "../components/CardItem/CardItem";
import { CircularIndeterminate } from "../components/layout/Loader";

const AdsGrid = styled("div")`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

export function AdsSection() {
  const dispatch = useDispatch();

  // we only need the raw ads and the current page from the store
  // const { ads, page } = useSelector((state: RootState) => ({
  //   ads: state.ads,
  //   page: state.page,
  // }));
  const ads = useSelector((state: RootState) => state.ads);
  const page = useSelector((state: RootState) => state.page);

  // hook returns already filtered and paginated data
  const { displayedAds, totalPages } = useFilteredAds();

  //if current filters shrink the list and the page number becomes too big, reset to 1
  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      dispatch(setPage(1));
    }
  }, [dispatch, page, totalPages]);

  const handlePrev = () => page > 1 && dispatch(setPage(page - 1));
  const handleNext = () => page < totalPages && dispatch(setPage(page + 1));

  return ads.length === 0 ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 240,
      }}
    >
      <CircularIndeterminate />
    </Box>
  ) : (
    <Box
      className="ads-container"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        mt: 4,
        width: "950px",
        maxWidth: "100%",
        mx: "auto",
      }}
    >
      <AdsGrid id="ads">
        {displayedAds.map((ad) => (
          <CardItem ad={ad} key={ad.id} />
        ))}
      </AdsGrid>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          my: 3,
        }}
      >
        <Button variant="outlined" disabled={page === 1} onClick={handlePrev}>
          Prev
        </Button>

        <Typography>
          Page {page} of {totalPages}
        </Typography>

        <Button
          variant="outlined"
          disabled={page === totalPages}
          onClick={handleNext}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

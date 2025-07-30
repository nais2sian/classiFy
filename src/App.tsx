import React, { useEffect } from "react";
import { AppRouter } from "./routes/AppRouter";
import { useDispatch } from "react-redux";
import { adsSlice } from "./stores/AdStore";
import { getAllItems } from "./api/adsApi";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";

const App: React.FC = () => {
  const dispatch = useDispatch();
  async function loadItems() {
    const items = await getAllItems();
    dispatch(adsSlice.actions.setAds(items));
  }

  useEffect(() => {
    loadItems();
  }, []);

  const AppRouterContainer = styled(Container)`
    background-color: lightgray;
    padding: 1rem;
  `;

  return (
    <>
      <AppRouterContainer maxWidth="xl">
        <AppRouter />
      </AppRouterContainer>
    </>
  );
};

export default App;

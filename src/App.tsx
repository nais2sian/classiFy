import React, { useEffect } from "react";
import { AppRouter } from "./routes/AppRouter";
import { Menu } from "./components/layout/Menu";
import { adsStore, adsSlice } from "./stores/AdStore";
import { getAllItems } from "./api/adsApi";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";

const App: React.FC = () => {
  async function loadItems() {
    const items = await getAllItems();
    adsStore.dispatch(adsSlice.actions.setAds(items));
  }

  useEffect(() => {
    loadItems();
  }, []);

  const AppRouterContainer = styled(Container)`
    background-color: lightgray;
    padding: 1rem;
  `;

  const handleSearch = (q: string) => {
    console.log("query ->", q);
    // navigate(`/search?q=${encodeURIComponent(q)}`)
  };

  return (
    <>
      <Menu onSearch={handleSearch} />
      <AppRouterContainer maxWidth="xl">
        <AppRouter />
      </AppRouterContainer>
    </>
  );
};

export default App;

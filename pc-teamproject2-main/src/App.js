import React from "react";
import { Box, Tabs, Tab, Typography, AppBar, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import SearchPage from "./SearchPage";
import MyAccount from "./MyAccount";
import SearchHistoryPage from "./SearchHistoryPage";
import FavoritPage from "./FavoritPage";

const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
});

export default function App() {
  const [currentTab, setCurrentTab] = React.useState(0);
  const [searchResult, setSearchResult] = React.useState([]);
  const [theme, setTheme] = React.useState(lightTheme);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar position="fixed">
        <Typography align="center" variant="h3" color="inherit">
          Favorite Music
        </Typography>
      </AppBar>
      <div style={{ height: 60, width: "100%" }}></div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={currentTab} onChange={handleTabChange} aria-label="basic tabs" centered>
          <Tab label="Search Music" value={0} />
          <Tab label="Favorites" value={1} />
          <Tab label="History" value={2} />
          <Tab label="My Account" value={3} />
        </Tabs>
      </Box>

      {currentTab == 0 && <SearchPage list={searchResult} onSearch={setSearchResult} />}
      {currentTab == 1 && <FavoritPage />}
      {currentTab == 2 && <SearchHistoryPage list={searchResult} onSearch={setSearchResult} />}
      {currentTab == 3 && <MyAccount setCurrentTab={setCurrentTab} setTheme={setTheme} />}
    </ThemeProvider>
    </React.Fragment>
  );
}

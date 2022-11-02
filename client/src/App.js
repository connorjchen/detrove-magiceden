import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Marketplace from "./screens/marketplace";
import Listing from "./screens/listing";
import Sell from "./screens/sell";
import Profile from "./screens/profile";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme";

const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};

// update profile with address?
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ScrollToTop>
          <NavBar />
          <Routes>
            <Route path="/" element={<Marketplace />} exact />
            <Route path="/solana/:address" element={<Listing />} />
            <Route path="/sell/:address" element={<Sell />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

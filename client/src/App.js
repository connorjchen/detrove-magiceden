import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Marketplace from "./screens/marketplace";
import Product from "./screens/product";
import Sell from "./screens/sell";
import Buy from "./screens/buy";
import Landing from "./screens/landing";
import Profile from "./screens/profile";
import Layout from "./components/layout";
import Listing from "./screens/listing";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import { SnackbarProvider } from "notistack";
import ReactGa from "react-ga";

const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};

function App() {
  useEffect(() => {
    ReactGa.initialize(process.env.REACT_APP_GA_TRACKING_ID);
    // ReactGa.pageview(
    //   window.location.pathname,
    //   undefined,
    //   '{{ getenv "BRANCH" }}'
    // );
    // unsure if this getenv thing works
    // unsure if this tracks changes between marketplace to profile/sell/buy
    ReactGa.pageview("/");
  }, []);

  return (
    <ThemeProvider theme={theme}>
<<<<<<< HEAD
      <BrowserRouter>
        <ScrollToTop>
          <NavBar />
          <Routes>
            <Route path="/" element={<Marketplace />} exact />
<<<<<<< HEAD
            <Route path="/solana/:address" element={<Listing />} />
            <Route path="/sell/:address" element={<Sell />} />
            <Route path="/buy/:address" element={<Buy />} />
            <Route path="profile" element={<Profile />} />
=======
            <Route path="/product/:sneakerId" element={<Product />} />
            <Route path="/sell/:sneakerId" element={<Sell />} />
            <Route path="/profile" element={<Profile />} />
>>>>>>> cbded3e (Implemented SQL routes and reducers (#26))
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
=======
      <SnackbarProvider>
        <BrowserRouter>
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Landing />} exact />
              <Route element={<Layout />}>
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/product/:sneakerId" element={<Product />} />
                <Route path="/sell/:sneakerId" element={<Sell />} />
                <Route path="/buy/:sneakerId" element={<Buy />} />
                <Route path="/listing/:listingId" element={<Listing />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </ScrollToTop>
        </BrowserRouter>
      </SnackbarProvider>
>>>>>>> 5fc6251 (Connor/redux refactor (#30))
    </ThemeProvider>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Marketplace from "./screens/marketplace";
import Product from "./screens/product";
import Sell from "./screens/sell";
import Buy from "./screens/buy";
import Landing from "./screens/landing";
import Profile from "./screens/profile";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import Layout from "./components/layout";
import Listing from "./screens/listing";
import { ThemeProvider, Box, Typography } from "@mui/material";
import theme from "./styles/theme";
import { SnackbarProvider } from "notistack";

const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};

function App() {
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  if (windowSize.innerWidth < 750) {
    return (
      <Box height="100vh" display="flex">
        <Typography
          variant="h6"
          fontSize="30px"
          fontWeight="normal"
          margin="auto"
          textAlign="center"
        >
          Sorry! Detrove is only available on larger screen sizes currently.
        </Typography>
      </Box>
    );
  }

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

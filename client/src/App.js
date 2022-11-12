import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Marketplace from "./screens/marketplace";
import Product from "./screens/product";
import Sell from "./screens/sell";
import Buy from "./screens/buy";
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

function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;

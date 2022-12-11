import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Container,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
  OutlinedInput,
  Link,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { experimental_sx as sx } from "@mui/system";
import Button from "../components/landingPage/Button";
import Footer from "../components/landingPage/Footer";
import InfoCard from "../components/landingPage/InfoCard";
import Navbar from "../components/landingPage/Navbar";
import Tile from "../components/landingPage/Tiles";
import authenticityIcon from "../images/authenticity-icon.svg";
import sneakerVideo from "../images/sneakerAnimation2.mp4";
import discountIcon from "../images/discount.png";
import vaultIcon from "../images/vault.png";
import iphone from "../images/iphone demo.png";
import addEmail from "../redux/actions/landingActions";
import Aos from "aos";
import "aos/dist/aos.css";
import ReactGa from "react-ga";

const Title = styled(Typography)(
  sx({
    fontSize: { xs: "2rem", sm: "3rem", md: "4.75rem" },
    fontWeight: 600,
    letterSpacing: { xs: -1, sm: -0.8 },
    lineHeight: { xs: "40px", sm: "60px", md: "94px" },
  })
);

// const servicePoints = [
//   { title: "No-fee vault storage at Brink’s", icon: "/service-vault.svg" },
//   { title: "Authenticity guarantee", icon: "/service-authentic.svg" },
//   { title: "No sales tax on vault transactions", icon: "/service-no-tax.svg" },
//   { title: "Fully insured vaulted assets", icon: "/service-insurance.svg" },
//   {
//     title: "Always redeemable for physical assets",
//     icon: "/service-redeem.svg",
//   },
//   { title: "Seamlessly buy and sell as an NFT", icon: "/service-buy-sell.svg" },
//   {
//     title: "Insured delivery of physical assets to 150+ countries",
//     icon: "/service-delivery.svg",
//   },
// ];

const Home = () => {
  const mediumMediaQuery = useMediaQuery("(max-width:900px)");
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <Box id="top-container">
      <Container sx={{ maxWidth: 0.95 }}>
        <Navbar />
        <Box
          data-aos="fade-down"
          data-aos-duration="1000"
          sx={{
            mt: { xs: 4, md: 16 },
            position: "relative",
            overflow: "hidden",
          }}
        >
          {mediumMediaQuery && (
            <video
              src={sneakerVideo}
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                zIndex: -10,
                WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                outline: "none",
                border: "none",
              }}
            />
          )}
          <Title
            variant="h1"
            sx={{ maxWidth: { xs: 1, md: 0.6 }, fontWeight: 900 }}
          >
            Invest in{" "}
            <span style={{ color: theme.palette.accent.logoDark }}>
              Sneakers
            </span>{" "}
            like Stocks
          </Title>
          <Typography
            sx={{
              fontSize: "1.125rem",
              lineHeight: "24px",
              letterSpacing: "-0.8px",
              maxWidth: { xs: 1, md: 0.5 },
              mt: 4,
            }}
          >
            Enjoy 5% total transaction fees, instant transactions and zero
            consignment fees
          </Typography>
          <Box
            sx={{
              mt: 6,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <OutlinedInput
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter Email"
              sx={{
                ...theme.inputAnimation,
                borderRadius: "8px",
                width: { xs: "auto", md: "240px" },
              }}
            />
            <Button
              title="Apply for Early Access"
              variant="primary"
              color="black"
              sx={{
                width: { xs: "auto", md: "240px" },
                boxSizing: "border-box",
                ml: { xs: 0, md: 1 },
                mt: { xs: 2, md: 0 },
              }}
              onClick={() => {
                ReactGa.event({
                  category: "Email Button",
                  action: "Email added to waitlist",
                });
                if (/\S+@\S+\.\S+/.test(email) === false) {
                  enqueueSnackbar("Invalid email format", {
                    variant: "error",
                  });
                  return;
                } else {
                  dispatch(addEmail(email));
                  setEmail("");
                  enqueueSnackbar("Email added to waitlist", {
                    variant: "success",
                  });
                }
              }}
            />
          </Box>
          <Box
            sx={{
              mt: { xs: 0, md: 19 },
            }}
          >
            {!mediumMediaQuery && (
              <video
                src={sneakerVideo}
                autoPlay
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "85%",
                  position: "absolute",
                  right: -261,
                  top: 30,
                  outline: "none",
                  border: "none",
                  zIndex: -10,
                  borderRadius: "40px",
                  WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                }}
              />
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            columnGap: { xs: 0, md: "20px" },
            rowGap: { xs: 2, md: 0 },
            mt: { xs: 7, md: 10 },
          }}
        >
          <Tile
            imgSrcImage={mediumMediaQuery ? null : authenticityIcon}
            imgSrcIcon={mediumMediaQuery ? authenticityIcon : null}
            title="Authenticity Guaranteed"
            text="Thanks to our meticulous multi-verification process, we ensure your product is authentic, otherwise, get your money back guaranteed"
          />
          <Tile
            compact
            imgSrcIcon={discountIcon}
            title="Save More, Earn More"
            text="Maximize your profits with no shipping cost, sales tax, and the lowest transaction fees"
          />
        </Box>
        <Box
          data-aos="fade-down"
          data-aos-duration="1000"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            columnGap: { xs: 0, md: "20px" },
            rowGap: { xs: 2, md: 0 },
            mt: 2.5,
          }}
        >
          <Tile
            compact
            imgSrcIcon={vaultIcon}
            title="Save Space in Your Home"
            text="Your brand new sneakers are insured and kept in our secure, climate-controlled vault to be redeemed at any time"
          />
          <Tile
            blackBg
            imgIphone={iphone}
            title="Fast Sales, Instant Profit"
            text="Stop waiting, get your payout instantly after you sell your kicks"
          />
        </Box>

        <Title
          data-aos="fade-down"
          data-aos-duration="1000"
          variant="h2"
          sx={{ textAlign: "center", mt: { xs: 7, md: 24 } }}
          id="how-it-works"
        >
          How does it work?
        </Title>
        <Box sx={{ mt: { xs: 4, md: 10.25 }, mb: { xs: 7, md: 24 } }}>
          <InfoCard
            title="1. Send your Sneakers"
            text="Simply mail us the item and we'll add it to your collection once it's verified."
            sx={{ maxWidth: { xs: 1, sm: 0.95 }, mb: 4 }}
          />
          <InfoCard
            title="2. Buy and Sell Sneakers"
            text="Speculate on the price of sneakers and sell them at a profit."
            sx={{ maxWidth: { xs: 1, sm: 0.95 }, mb: 4, ml: "auto" }}
          />
          <InfoCard
            title="3. Redeem your Sneakers"
            text="Want to wear your sneakers? Redeem them at any time for the authentic item."
            sx={{ maxWidth: { xs: 1, sm: 0.95 }, ml: "auto" }}
          />
        </Box>

        {/* <Box sx={{ mb: { xs: 9, sm: 21 } }}>
          <Title variant="h2" sx={{ textAlign: "center", mb: 8 }}>
            Have more questions?
          </Title>
          <Button
            title="Read our FAQ"
            variant="secondary"
            onClick={() =>
              window.open(
                "https://docs.courtyard.io/courtyard/about-courtyard/ship-your-collectible",
                "_blank"
              )
            }
            color="black"
            sx={{ mx: "auto" }}
          />
        </Box> */}
      </Container>
      <Box sx={{ bgcolor: "black" }}>
        <Container
          sx={{
            maxWidth: 0.95,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", sm: "4rem" },
              fontWeight: 600,
              letterSpacing: { xs: -1, sm: -0.8 },
              lineHeight: { xs: "40px", sm: "94px" },
              color: "white",
              textAlign: "center",
              mt: { xs: 8, sm: 12 },
            }}
          >
            Be a Part of the Future of Reselling
          </Typography>
          <Link
            href={"/#top-container"}
            sx={{
              textDecoration: "none",
            }}
          >
            <Button
              title="Apply for Early Access"
              variant="secondary"
              color="white"
              sx={{ mt: { xs: 4, sm: 9 }, mb: { xs: 4, sm: 9 } }}
            />
          </Link>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;

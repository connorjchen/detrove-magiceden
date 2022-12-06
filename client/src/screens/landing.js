import React from "react";
import {
  Box,
  Container,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
  TextField,
} from "@mui/material";
import { experimental_sx as sx } from "@mui/system";
import Button from "../components/landingPage/Button";
import Explainer from "../components/landingPage/Explainer";
import Footer from "../components/landingPage/Footer";
import InfoCard from "../components/landingPage/InfoCard";
import Navbar from "../components/landingPage/Navbar";
import Tile from "../components/landingPage/Tiles";
import authenticityIcon from "../images/authenticity-icon.svg";
import sneakerVideo from "../images/sneakerAnimation2.mp4";
import authenticityIcon2 from "../images/verification.png";
import discountIcon from "../images/discount.png";
import vaultIcon from "../images/vault.png";
import iphone from "../images/iphone demo.png";

const Title = styled(Typography)(
  sx({
    fontSize: { xs: "2rem", sm: "3rem", md: "4.75rem" },
    fontWeight: 600,
    letterSpacing: { xs: -1, sm: -0.8 },
    lineHeight: { xs: "40px", sm: "60px", md: "94px" },
  })
);

const servicePoints = [
  { title: "No-fee vault storage at Brink’s", icon: "/service-vault.svg" },
  { title: "Authenticity guarantee", icon: "/service-authentic.svg" },
  { title: "No sales tax on vault transactions", icon: "/service-no-tax.svg" },
  { title: "Fully insured vaulted assets", icon: "/service-insurance.svg" },
  {
    title: "Always redeemable for physical assets",
    icon: "/service-redeem.svg",
  },
  { title: "Seamlessly buy and sell as an NFT", icon: "/service-buy-sell.svg" },
  {
    title: "Insured delivery of physical assets to 150+ countries",
    icon: "/service-delivery.svg",
  },
];

const openWaitlistForm = () => {
  // window.open(waitListFormUrl, "_blank");
};

const openEmailForm = () => {
  // window.open(emailFormUrl, "_blank");
};

const Home = () => {
  const mobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  return (
    <Box>
      <Container sx={{ maxWidth: 0.95 }}>
        <Navbar />
        <Box
          sx={{
            mt: { xs: 4, sm: 16 },
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* {mobile && (
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
          )} */}
          <Title
            variant="h1"
            sx={{ maxWidth: { xs: 1, sm: 0.6 }, fontWeight: 900 }}
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
              maxWidth: { xs: 1, sm: 0.5 },
              mt: 4,
            }}
          >
            Enjoy 3% total transaction fees, instant transactions and zero
            consignment fees
          </Typography>
          <Box
            sx={{
              mt: 6,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <TextField
              id="outlined-basic"
              label="Enter Email"
              variant="outlined"
              color="grey"
            />
            <Button
              title="Join the waitlist"
              variant="primary"
              color="black"
              sx={{ width: { xs: "auto", sm: "fit-content" }, ml: 1 }}
              onClick={openWaitlistForm}
            />
          </Box>
          <Box
            sx={{
              mt: 19,
            }}
          >
            {!mobile && (
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
            {/* {!mobile && (
              <video
                src={sneakerVideo}
                autoPlay
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  right: 0,
                  top: -5,
                  outline: "none",
                  border: "none",
                  zIndex: -10,
                  borderRadius: "40px",
                  WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                }}
              />
            )} */}
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
            imgSrcImage={authenticityIcon}
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
          variant="h2"
          sx={{ textAlign: "center", mt: { xs: 7, md: 24 } }}
          id="how-it-works"
        >
          How does it work?
        </Title>
        <Box sx={{ mt: 10.25, mb: { xs: 7, sm: 25 } }}>
          <InfoCard
            title="1. Ship your collectible"
            text="Join the waitlist to send collectibles directly to Courtyard with no-fee shipping and bank-grade storage provided by Brink’s."
            sx={{ maxWidth: { xs: 1, sm: 0.95 }, mb: 4 }}
          />
          <InfoCard
            title="2. Convert your collectible"
            text="Once we authenticate your asset, we create and send a Connected Collectible (a type of NFT) to your wallet to supercharge your once-dormant physical asset with new possibilities."
            sx={{ maxWidth: { xs: 1, sm: 0.95 }, mb: 4, ml: "auto" }}
          />
          <InfoCard
            title="3. Trade to earn passive income"
            text="Set a price, let the bids roll in, or HODL. You have complete ownership of the Connected Collectible, which is immediately tradable on the blockchain. Each time your Connected Collectible is sold on a marketplace after the initial sale, you will receive 1% of each future sale until the physical collectible is redeemed by another collector."
            sx={{ maxWidth: { xs: 1, sm: 0.95 }, mb: 4 }}
          />
          <InfoCard
            title="4. Redeem your collectible"
            text="Connected Collectibles are always redeemable for the physical collectible. And if you’re the original owner and don’t sell the Connected Collectible you listed, you can redeem your physical collectible without paying withdrawal fees at any time."
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
            alignItems: { xs: "flex-start", sm: "center" },
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
              textAlign: { xs: "left", sm: "center" },
              mt: { xs: 8, sm: 12 },
            }}
          >
            Invest in Culture
          </Typography>
          <Button
            title="Join the waitlist"
            variant="secondary"
            onClick={openWaitlistForm}
            color="white"
            sx={{ mt: { xs: 4, sm: 9 }, mb: { xs: 4, sm: 12 } }}
          />
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;

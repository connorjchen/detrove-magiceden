import React from "react";
import {
  Box,
  Container,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { experimental_sx as sx } from "@mui/system";
import Button from "../components/landingPage/Button";
import Explainer from "../components/landingPage/Explainer";
import Footer from "../components/landingPage/Footer";
import InfoCard from "../components/landingPage/InfoCard";
import Navbar from "../components/landingPage/Navbar";
import Tile from "../components/landingPage/Tiles";
import sneakerVideo from "../images/sneakerAnimation.mp4";
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
        <Navbar
          ctaButtonParams={{
            title: "Join the waitlist",
            onClick: openWaitlistForm,
          }}
        />
        <Box
          sx={{
            mt: { xs: 4, sm: 16 },
            position: "relative",
            overflow: "hidden",
          }}
        >
          {mobile && (
            <video
              src={sneakerVideo}
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "600px",
                zIndex: -10,
                WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                outline: "none",
                border: "none",
              }}
            />
          )}
          <Title variant="h1" sx={{ maxWidth: "900px", fontWeight: 700 }}>
            Speculate on{" "}
            <span style={{ color: theme.palette.accent.dark }}>Sneakers</span>{" "}
            and avoid absurd prices
          </Title>
          <Typography
            sx={{
              fontSize: "1.125rem",
              lineHeight: "24px",
              letterSpacing: "-0.8px",
              maxWidth: { xs: 1, sm: 0.6 },
              mt: 4,
            }}
          >
            Reduce Space. Reduce Cost. Reduce Time.
          </Typography>
          <Box
            sx={{
              mt: 6,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Button
              title="Join the waitlist"
              variant="primary"
              color="black"
              sx={{ width: { xs: "auto", sm: "fit-content" } }}
              onClick={openWaitlistForm}
            />
          </Box>
          <Box
            sx={{
              height: "200px",
              mt: 10,
              borderRadius: "50%",
            }}
          >
            {!mobile && (
              <video
                src={sneakerVideo}
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: "45%",
                  position: "absolute",
                  right: mobile ? -80 : -30,
                  top: mobile ? -60 : 0,
                  zIndex: -10,
                  WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                  outline: "none",
                  border: "none",
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
            blackBg
            imgSrcPolygon="/polygon-dot-blue.svg"
            imgSrcImage="/tile-pokemon.webp"
            title="Earn 1% on every future sale"
            text="Vault and sell your Connected Collectibles to receive payouts every time they’re traded on marketplaces like OpenSea and the Courtyard marketplace."
          />
          <Tile
            compact
            imgSrcIcon="/verified-icon.svg"
            title="Authenticated, Vaulted, and Insured"
            text="Feel confident that your assets are safe while you collect and trade. Every collectible is authenticated by experts, insured, and secured in a Brink’s vault."
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
            imgSrcIcon="/percent-icon.svg"
            title="No sales tax or fees for vaulted assets"
            text="Store your assets with Courtyard without paying sales tax, storage, or selling fees on vaulted transactions."
          />
          <Tile
            blackBg
            imgSrcPolygon="/polygon-dot-yellow.svg"
            imgSrcImage="/tile-shoe.webp"
            title="Flex your collection"
            text="Bring your collectibles out of your private collection and into the metaverse with Oncyber spaces and digital collectibles on Instagram."
          />
        </Box>

        <Explainer
          contentAlignDesktop="left"
          contentAlignMobile="bottom"
          sx={{ mt: { xs: 9, sm: 24 }, mb: { xs: 9, sm: 24 } }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexWrap: "wrap",
              columnGap: 6,
              rowGap: 8,
            }}
          >
            {servicePoints.map((service, index) => (
              <Box
                key={index}
                sx={{
                  width: { xs: 1, sm: 260, md: 280 },
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <img
                  src={service.icon}
                  style={{ width: "34px" }}
                  alt={service.title}
                ></img>
                <Typography
                  sx={{
                    color: "white",
                    textAlign: "left",
                    ml: 3,
                  }}
                >
                  {service.title}
                </Typography>
              </Box>
            ))}
          </Box>
        </Explainer>

        <Title variant="h2" sx={{ textAlign: "center" }} id="how-it-works">
          How does it work?
        </Title>
        <Box sx={{ mt: 10.25, mb: { xs: 7, sm: 25 } }}>
          <InfoCard
            color="orange"
            title="1. Ship your collectible"
            text="Join the waitlist to send collectibles directly to Courtyard with no-fee shipping and bank-grade storage provided by Brink’s."
            sx={{ maxWidth: { xs: 1, sm: 0.95 }, mb: 4 }}
          />
          <InfoCard
            color="red"
            title="2. Convert your collectible"
            text="Once we authenticate your asset, we create and send a Connected Collectible (a type of NFT) to your wallet to supercharge your once-dormant physical asset with new possibilities."
            sx={{ maxWidth: { xs: 1, sm: 0.95 }, mb: 4, ml: "auto" }}
          />
          <InfoCard
            color="purple"
            title="3. Trade to earn passive income"
            text="Set a price, let the bids roll in, or HODL. You have complete ownership of the Connected Collectible, which is immediately tradable on the blockchain. Each time your Connected Collectible is sold on a marketplace after the initial sale, you will receive 1% of each future sale until the physical collectible is redeemed by another collector."
            sx={{ maxWidth: { xs: 1, sm: 0.95 }, mb: 4 }}
          />
          <InfoCard
            color="blue"
            title="4. Redeem your collectible"
            text="Connected Collectibles are always redeemable for the physical collectible. And if you’re the original owner and don’t sell the Connected Collectible you listed, you can redeem your physical collectible without paying withdrawal fees at any time."
            sx={{ maxWidth: { xs: 1, sm: 0.95 }, ml: "auto" }}
          />
        </Box>
        <Explainer
          contentAlignDesktop="right"
          contentAlignMobile="top"
          sx={{ mb: { xs: 9, sm: 24 } }}
        >
          <Box>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.75rem", sm: "1.75rem", md: "3.5rem" },
                fontWeight: 700,
                letterSpacing: { xs: -0.7, sm: -0.7, md: -2 },
                lineHeight: { xs: 1.143, sm: 1.143, md: 1 },
                color: "white",
                mb: 2.5,
              }}
            >
              What is a Connected Collectible?
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.875rem", sm: "0.875rem", md: "1.125rem" },
                fontWeight: 600,
                letterSpacing: { xs: -0.7, sm: -0.7, md: -0.8 },
                lineHeight: { xs: 1.429, sm: 1.429, md: 1.556 },
                color: "white",
              }}
            >
              A Connected Collectible functions as a digital certificate of a
              physical asset in the form of a Non-Fungible Token (NFT). Once the
              underlying asset is securely vaulted and insured, the Connected
              Collectible is issued to the collector's wallet. Collectors can
              then trade the Connected Collectible on any NFT marketplace, while
              the provenance and transaction history are secured on the
              blockchain.
              <br />
              <br />
              Connected Collectibles can always be redeemed for the exact
              physical asset. Once the Connected Collectible is sold to another
              collector, the first owner no longer owns the physical asset and
              can no longer redeem it.
            </Typography>
          </Box>
        </Explainer>
        <Box sx={{ mb: { xs: 9, sm: 21 } }}>
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
        </Box>
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
            Collect, sell, and earn passive income
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

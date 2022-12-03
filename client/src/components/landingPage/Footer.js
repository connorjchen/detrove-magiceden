import { Box, Container, Link, Typography } from "@mui/material";
import React from "react";
import twitterLogo from "../../images/twitter-white.svg";
import discordLogo from "../../images/discord-logo.svg";
import LinkedinLogo from "../../images/linked-in-white.svg";
import GitbookLogo from "../../images/gitbook-white.svg";

import SocialIcons from "../socialIcons";
const navLinks = [
  { title: "How it works", href: "/#how-it-works", newTab: false },
  {
    title: "Marketplace",
    href: "https://detrove.io",
    newTab: false,
  },
  { title: "Redeem", href: "redeem", newTab: true },
  { title: "Courtyard for Business", href: "/business", newTab: false },
  { title: "Documentation", href: "https://docs.courtyard.io/", newTab: true },
  { title: "Careers", href: "/careers", newTab: true },
  { title: "Terms of Service", href: "/terms-of-service", newTab: true },
  { title: "Privacy", href: "/privacy", newTab: true },
];

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "black" }}>
      <Container
        sx={{
          maxWidth: 0.95,
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "flex-start", md: "center" },
        }}
      >
        <Box
          sx={{
            width: 1,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "center", md: "flex-end" },
            mb: { xs: 0, md: 10 },
            mt: 7,
          }}
        >
          <Box
            sx={{
              height: { xs: "auto", md: 180 },
              width: { xs: 1, md: 400 },
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              justifyContent: "center",
              rowGap: 2,
              columnGap: 6,
              mb: { xs: 8, md: 0 },
            }}
          >
            {navLinks.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                sx={{ color: "white", textDecoration: "none" }}
                target={item.newTab ? "_blank" : "_self"}
                rel={item.newTab ? "noopener noreferrer" : ""}
              >
                <Typography>{item.title}</Typography>
              </Link>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              columnGap: 1.5,
              mb: { xs: 8, md: 0 },
            }}
          >
            <SocialIcons
              defaultName="Twitter"
              link="https://twitter.com/"
              image={twitterLogo}
            />
            <SocialIcons
              defaultName="Discord"
              link="https://discord.gg/9fvQcnvda2"
              image={discordLogo}
            />

            <SocialIcons
              defaultName="LinkedIn"
              link="https://linkedin.com/"
              image={LinkedinLogo}
            />

            <SocialIcons
              defaultName="Gitbook"
              link="https://detrove.gitbook.io/litepaper/"
              image={GitbookLogo}
            />
          </Box>
        </Box>
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: 500,
            lineHeight: "22px",
            textAlign: "left",
            width: 1,
            color: "rgba(255, 255, 255, 0.5)",
            mb: 8,
          }}
        >
          © Detrove, Inc.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

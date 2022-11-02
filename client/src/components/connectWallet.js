import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import phantomLogo from "../images/phantomLogo.svg";
import { Box, Typography, Button } from "@mui/material";
const connectWallet = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  return (
    <Button
      sx={{
        display: "flex",
        alignItems: "center",
        background: "rgba(22, 22, 26, 0.5)",
        borderRadius: "16px",
        padding: "6px 12px 6px 8px",
        "&:hover": {
          background: "rgba(22, 22, 26, 0.5)",
        },
      }}
    >
      <Box component="img" src={phantomLogo} alt="phantom logo" />
      <Typography variant="h6" color={theme.palette.primary.main}>
        Connect
      </Typography>
    </Button>
  );
};

export default connectWallet;

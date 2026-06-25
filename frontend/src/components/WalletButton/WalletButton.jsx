import { useBlockchain } from "../../context/BlockchainContext";

import Button from "../Button/Button";

function WalletButton() {

  const {
    wallet,
    connectWallet,
  } = useBlockchain();

  return (
    <Button onClick={connectWallet}>
      {
        wallet
          ? `${wallet.slice(0,6)}...${wallet.slice(-4)}`
          : "Connect Wallet"
      }
    </Button>
  );
}

export default WalletButton;
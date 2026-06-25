import { Link } from "react-router-dom";
import { useBlockchain } from "../../context/BlockchainContext";

function Navbar() {

  const { wallet, connectWallet } = useBlockchain();

  return (

    <nav>

      <Link to="/">Home</Link>

      {" | "}

      <Link to="/marketplace">Marketplace</Link>

      {" | "}

      <Link to="/mint">Mint NFT</Link>

      {" | "}

      <Link to="/my-nfts">My NFTs</Link>

      <button
        style={{ marginLeft: "20px" }}
        onClick={connectWallet}
      >
        {wallet
          ? wallet.slice(0, 6) + "..." + wallet.slice(-4)
          : "Connect Wallet"}
      </button>

    </nav>

  );
}

export default Navbar;
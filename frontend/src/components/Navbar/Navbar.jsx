import { NavLink } from "react-router-dom";
import { useBlockchain } from "../../context/BlockchainContext";

import "./Navbar.css";

function Navbar() {

  const { wallet, connectWallet } = useBlockchain();

  return (

    <nav className="navbar">

      <h2 className="logo">

        NFT Marketplace

      </h2>

      <div className="nav-links">

        <NavLink to="/">
          Home
        </NavLink>

        <NavLink to="/marketplace">
          Marketplace
        </NavLink>

        <NavLink to="/mint">
          Mint NFT
        </NavLink>

        <NavLink to="/my-nfts">
          My NFTs
        </NavLink>

        <NavLink to="/listed">
          Listed
        </NavLink>

      </div>

      {

        wallet ?

        <div className="wallet-pill">

          <span className="wallet-dot"></span>

          {wallet.slice(0,6)}
          ...
          {wallet.slice(-4)}

        </div>

        :

        <button
          className="connect-btn"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>

      }

    </nav>

  );

}

export default Navbar;
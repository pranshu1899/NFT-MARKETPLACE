import { useState } from "react";
import { ethers } from "ethers";

import MyNFTArtifact from "./contract/MyNFT.json"
import MarketplaceArtifact from "./contract/NFTMarketplace.json"


 const App = () => {

  const [wallet, setWallet] = useState("");
  const [nft, setNft] = useState(null);
  const [marketplace, setMarketplace] = useState(null);

  const [tokenURI, setTokenURI] = useState("");

  const [tokenId, setTokenId] = useState("");

  const NFT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const MARKETPLACE_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  async function connectWallet() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setWallet(accounts[0]);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const nftContract = new ethers.Contract(
      NFT_ADDRESS,
      MyNFTArtifact.abi,
      signer
    );
    setNft(nftContract);
    
    const marketplaceContract = new ethers.Contract(
      MARKETPLACE_ADDRESS,
      MarketplaceArtifact.abi,
      signer
    );
    setMarketplace(marketplaceContract);
  }

  async function mintNFT(){
    const tx = await nft.mint(tokenURI);
    await tx.wait();
  }
  async function approveNFT(){
    const tx = await nft.approve(
      MARKETPLACE_ADDRESS,
      tokenId
    );
    await tx.wait();
  }

  return (
    <div>
      <h1>NFT Marketplace</h1>
      <h3>Wallet : {wallet? wallet: "Not connected"} </h3>
      <button onClick={connectWallet}>Connect wallet</button>

      <input
         type="text"
         placeholder="Token URI" 
         value={tokenURI}
         onChange={(e) => setTokenURI(e.target.value)}
      />
      <button onClick={mintNFT}>Mint NFT</button>

      <input 
        type="number"
        placeholder="Token id"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
        />
      <button onClick={approveNFT}>Approve NFT</button>
    </div>
  )
}

export default App

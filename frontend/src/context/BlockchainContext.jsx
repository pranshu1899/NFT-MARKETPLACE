import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

import MyNFTArtifact from "../contract/MyNFT.json";
import MarketplaceArtifact from "../contract/NFTMarketplace.json";

const BlockchainContext = createContext();

const NFT_ADDRESS = "0x303FDc5269c69A9e9577976381880A88746A8fc7";
const MARKETPLACE_ADDRESS = "0x30B167E6dBDBC19D845fc90fBF886068Af842561";

export function BlockchainProvider({ children }) {

  const [wallet, setWallet] = useState("");
  const [nft, setNft] = useState(null);
  const [marketplace, setMarketplace] = useState(null);

  function ipfsToHttp(ipfsUrl) {
    return ipfsUrl.replace(
      "ipfs://",
      "https://gateway.pinata.cloud/ipfs/"
    );
  }

  async function initializeContracts() {

    const provider = new ethers.BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();

    const nftContract = new ethers.Contract(
      NFT_ADDRESS,
      MyNFTArtifact.abi,
      signer
    );

    const marketplaceContract = new ethers.Contract(
      MARKETPLACE_ADDRESS,
      MarketplaceArtifact.abi,
      signer
    );

    setNft(nftContract);
    setMarketplace(marketplaceContract);

    return signer;

  }

  async function connectWallet() {

    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setWallet(accounts[0]);

    await initializeContracts();

  }

  useEffect(() => {

    async function autoConnect() {

      if (!window.ethereum) return;

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length === 0) return;

      setWallet(accounts[0]);

      await initializeContracts();

    }

    autoConnect();

  }, []);

  async function mintNFT(tokenURI) {
    const tx = await nft.mint(tokenURI);
    await tx.wait();
  }

  async function approveNFT(tokenId) {
    const tx = await nft.approve(
      MARKETPLACE_ADDRESS,
      tokenId
    );
    await tx.wait();
  }

  async function listNFT(tokenId, price) {
    const tx = await marketplace.listNFT(
      NFT_ADDRESS,
      tokenId,
      ethers.parseEther(price)
    );
    await tx.wait();
  }

  async function getListing(tokenId) {
    return await marketplace.listings(
      NFT_ADDRESS,
      tokenId
    );
  }

  async function buyNFT(tokenId) {

    const listing = await marketplace.listings(
      NFT_ADDRESS,
      tokenId
    );

    if (listing.price === 0n) {
      throw new Error("NFT not listed");
    }

    const tx = await marketplace.buyNFT(
      NFT_ADDRESS,
      tokenId,
      {
        value: listing.price,
      }
    );

    await tx.wait();

  }

  async function cancelListing(tokenId) {

    const tx = await marketplace.cancelListing(
      NFT_ADDRESS,
      tokenId
    );

    await tx.wait();

  }

  async function getAllListings() {

  if (!marketplace) return [];

  return await marketplace.getAllListings();

}

 async function getNFTMetadata(tokenId) {

  if (!nft) return null;

  try {

    const uri = await nft.tokenURI(tokenId);

    if (!uri.startsWith("ipfs://")) return null;

    const response = await fetch(ipfsToHttp(uri));

    const metadata = await response.json();

    return {

      tokenId,

      name: metadata.name,

      description: metadata.description,

      image: ipfsToHttp(metadata.image),

    };

  } catch {

    return null;

  }

}

  async function getMyNFTs() {

    if (!wallet) return [];

    const totalNFTs = Number(await nft.nextTokenId());

    const ownedNFTs = [];

    for (let i = 0; i < totalNFTs; i++) {

      try {

        const owner = await nft.ownerOf(i);

        if (owner.toLowerCase() !== wallet.toLowerCase()) {
          continue;
        }

        const uri = await nft.tokenURI(i);

        const response = await fetch(ipfsToHttp(uri));

        const metadata = await response.json();

        ownedNFTs.push({

          tokenId: i,

          name: metadata.name,

          description: metadata.description,

          image: ipfsToHttp(metadata.image),

        });

      } catch {}

    }

    return ownedNFTs;

  }

  return (

   <BlockchainContext.Provider
  value={{
    wallet,
    nft,
    marketplace,
    connectWallet,
    mintNFT,
    approveNFT,
    listNFT,
    buyNFT,
    cancelListing,
    getListing,
    getAllListings,
    getNFTMetadata,
    getMyNFTs,
  }}
>
  {children}
</BlockchainContext.Provider>

  );

}

export function useBlockchain() {

  return useContext(BlockchainContext);

}
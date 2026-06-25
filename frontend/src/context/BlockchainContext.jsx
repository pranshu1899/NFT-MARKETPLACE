import { createContext, useContext, useState } from "react";
import { ethers } from "ethers";

import MyNFTArtifact from "../contract/MyNFT.json";
import MarketplaceArtifact from "../contract/NFTMarketplace.json";

const BlockchainContext = createContext();

const NFT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const MARKETPLACE_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

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

    const marketplaceContract = new ethers.Contract(
      MARKETPLACE_ADDRESS,
      MarketplaceArtifact.abi,
      signer
    );

    setNft(nftContract);
    setMarketplace(marketplaceContract);
  }

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
    return await marketplace.getAllListings();
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

        if (!uri.startsWith("ipfs://")) {
          continue;
        }

        const response = await fetch(ipfsToHttp(uri));

        const metadata = await response.json();

        ownedNFTs.push({
          tokenId: i,
          name: metadata.name,
          description: metadata.description,
          image: ipfsToHttp(metadata.image),
        });
      } catch (err) {
        console.log("Skipping NFT", i, err);
      }
    }

    return ownedNFTs;
  }

  return (
    <BlockchainContext.Provider
      value={{
        wallet,
        connectWallet,
        mintNFT,
        approveNFT,
        listNFT,
        buyNFT,
        getListing,
        cancelListing,
        getAllListings,
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
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
  const [price, setPrice] = useState("");

  // buy
  const [buyTokenId, setBuyTokenId] = useState("");
  // const [buyPrice, setBuyPrice] = useState("");
  // advanced buy
  const [listingData, setListingData] = useState(null);

  // cancel
  const [cancelTokenId, setCancelTokenId] = useState("");

  // all listing
  const [allListings, setAllListings] = useState([]);

  // convienince feature
  const [myNFTs, setMyNFTs] = useState([]);
  // this is pending to learn 

  const NFT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const MARKETPLACE_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  function ipfsToHttp(ipfsUrl){
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
    setNft(nftContract);
    
    const marketplaceContract = new ethers.Contract(
      MARKETPLACE_ADDRESS,
      MarketplaceArtifact.abi,
      signer
    );
    setMarketplace(marketplaceContract);

//     console.log("NFT Address:", NFT_ADDRESS);
// console.log("Marketplace Address:", MARKETPLACE_ADDRESS);

// const code = await provider.getCode(MARKETPLACE_ADDRESS);
// console.log(code);
// window.nft = nftContract;
// window.marketplace = marketplaceContract;
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
  async function listNFT(){
    const tx = await marketplace.listNFT(
      NFT_ADDRESS,
      tokenId,
      ethers.parseEther(price)
    );
    await tx.wait();
  }
  async function buyNFT(){

    const listing = await marketplace.listings(
      NFT_ADDRESS,
      buyTokenId
    );
    if (listing.price === 0n) {
        alert("NFT not listed");
        return;
      }

    const tx = await marketplace.buyNFT(
      NFT_ADDRESS,
      buyTokenId,
      {
        // value: ethers.parseEther(buyPrice)
        // value: listingData.price
        value: listing.price
      }
    );
    await tx.wait();

    alert("NFT Purchased Successfully!!");
    setListingData(null);
  }
  async function getListing(){
    const listing = await marketplace.listings(
      NFT_ADDRESS,
      buyTokenId
    );
    setListingData(listing);
  }
  async function cancelListing(){
    const tx = await marketplace.cancelListing(
      NFT_ADDRESS,
      cancelTokenId
    );
    await tx.wait();
    alert("Listing cancelled");
    setListingData(null);
  }
  async function getAllListings() {
    const listings = await marketplace.getAllListings();
    setAllListings(listings);
  }
  // pending 
  async function getMyNFTs() {
    if (!wallet) {
      alert("Connect wallet first");
      return;
    }

    const totalNFTs = Number(await nft.nextTokenId());
    const ownedNFTs = [];
    
    for(let i = 0; i < totalNFTs; i++) {
      
      const owner = await nft.ownerOf(i);
      
      if(owner.toLowerCase() === wallet.toLowerCase()) {
        const uri = await nft.tokenURI(i);

        if(!uri.startsWith("ipfs://")){
          continue;
        }
        const url = ipfsToHttp(uri);
        const response = await fetch(url);
        const metadata = await response.json();
        console.log(metadata);
        
        ownedNFTs.push({
        tokenId: i,
        name: metadata.name,
        description: metadata.description,
        image: ipfsToHttp(metadata.image)
      });
    }
  }
  
  setMyNFTs(ownedNFTs);
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

      <input 
        type="number"
        placeholder="Price in ETH"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        />
      <button onClick={listNFT}>List NFT</button>

      {/* buy */}
      <input 
        type="number"
        placeholder="Token id"
        value={buyTokenId}
        onChange={(e) => setBuyTokenId(e.target.value)}
        />
      {/* <input 
        type="number"
        placeholder="amount to be paid"
        value={buyPrice}
        onChange={(e) => setBuyPrice(e.target.value)}
        /> */}
      <button onClick={getListing}>Get Listing</button>
      {listingData && (
        <div>
          <p>Seller: {listingData.seller} </p>
          <p>
            Price: {ethers.formatEther(listingData.price) }ETH
          </p>
        </div>
      )}
      {/* Agar listingData null nahi hai -> Tabhi seller aur price show karo */}

      <button onClick={buyNFT}>Buy NFT</button>

      {/* cancel */}
      <input 
        type="number"
        placeholder="Token id of cancelation listing"
        value={cancelTokenId}
        onChange={(e) => setCancelTokenId(e.target.value)}
        />
      <button onClick={cancelListing}>Cancel listing</button>

      <button onClick={getAllListings}>Show All Listings</button>

      {/* not learned */}
      <button onClick={getMyNFTs}>My NFTs</button>
      {/* till here not done */}

      {
        allListings  
          .filter(item => item.active)
          .map((abc) => (
            <div key={abc.tokenId}>
              <p>Token Id: {abc.tokenId} </p>
              <p>Seller: {abc.seller} </p>
              <p>Price: {ethers.formatEther(abc.price)} ETH </p> 
            </div>
          ))
      }
      
      <h2>My NFTs</h2>
      {
        myNFTs.map((item) => (
        <div key={item.tokenId}>
          <img
            src={item.image}
            alt={item.name}
            width="200"
          />

          <h3>{item.name}</h3>

          <p>{item.description}</p>

          <p>Token Id: {item.tokenId}</p>
        </div>
        ))
      }      
      


    </div>
  )
}

export default App

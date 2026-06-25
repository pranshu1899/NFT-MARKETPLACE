import { useState } from "react";
import { ethers } from "ethers";
import { useBlockchain } from "../context/BlockchainContext";

function Marketplace() {

  const {
    approveNFT,
    listNFT,
    getListing,
    buyNFT,
    cancelListing,
    getAllListings,
  } = useBlockchain();

  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState("");

  const [buyTokenId, setBuyTokenId] = useState("");
  const [listingData, setListingData] = useState(null);

  const [cancelTokenId, setCancelTokenId] = useState("");

  const [allListings, setAllListings] = useState([]);

  async function handleApprove() {
    try {
      await approveNFT(tokenId);
      alert("NFT Approved");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleList() {
    try {
      await listNFT(tokenId, price);

      alert("NFT Listed");

      setTokenId("");
      setPrice("");

    } catch (err) {
      console.log(err);
    }
  }

  async function handleGetListing() {

    try {

      const listing = await getListing(buyTokenId);

      setListingData(listing);

    } catch (err) {
      console.log(err);
    }

  }

  async function handleBuy() {

    try {

      await buyNFT(buyTokenId);

      alert("NFT Purchased");

      setListingData(null);

    } catch (err) {

      alert(err.message);

    }

  }

  async function handleCancel() {

    try {

      await cancelListing(cancelTokenId);

      alert("Listing Cancelled");

      setListingData(null);

    } catch (err) {

      console.log(err);

    }

  }

  async function handleAllListings() {

    try {

      const listings = await getAllListings();

      setAllListings(listings);

    } catch (err) {

      console.log(err);

    }

  }

  return (

    <div>

      <h1>Marketplace</h1>

      <h2>Approve NFT</h2>

      <input
        type="number"
        placeholder="Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />

      <button onClick={handleApprove}>
        Approve NFT
      </button>

      <br /><br />

      <input
        type="text"
        placeholder="Price in ETH"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={handleList}>
        List NFT
      </button>

      <hr />

      <h2>Buy NFT</h2>

      <input
        type="number"
        placeholder="Token ID"
        value={buyTokenId}
        onChange={(e) => setBuyTokenId(e.target.value)}
      />

      <button onClick={handleGetListing}>
        Get Listing
      </button>

      {
        listingData &&
        <>
          <p>Seller : {listingData.seller}</p>

          <p>
            Price : {ethers.formatEther(listingData.price)} ETH
          </p>
        </>
      }

      <button onClick={handleBuy}>
        Buy NFT
      </button>

      <hr />

      <h2>Cancel Listing</h2>

      <input
        type="number"
        placeholder="Token ID"
        value={cancelTokenId}
        onChange={(e) => setCancelTokenId(e.target.value)}
      />

      <button onClick={handleCancel}>
        Cancel Listing
      </button>

      <hr />

      <button onClick={handleAllListings}>
        Show All Listings
      </button>

      <br /><br />

      {
        allListings
          .filter(item => item.active)
          .map(item => (

            <div key={item.tokenId}>

              <h3>Token #{item.tokenId.toString()}</h3>

              <p>Seller : {item.seller}</p>

              <p>
                Price :
                {" "}
                {ethers.formatEther(item.price)}
                {" "}
                ETH
              </p>

              <hr />

            </div>

          ))
      }

    </div>

  );

}

export default Marketplace;
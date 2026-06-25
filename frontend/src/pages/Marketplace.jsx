import { useEffect, useState } from "react";
import { ethers } from "ethers";

import { useBlockchain } from "../context/BlockchainContext";

import NFTCard from "../components/NFTCard/NFTCard";
import Input from "../components/Input/Input";

import "../styles/marketplace.css";

function Marketplace() {

  const {
    getAllListings,
    getNFTMetadata,
    buyNFT,
  } = useBlockchain();

  const [allListings, setAllListings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMarketplace();
  }, []);

  async function loadMarketplace() {

    try {

      setLoading(true);

      const listings = await getAllListings();

      const activeListings = listings.filter(
        item => item.active
      );

      const finalNFTs = [];

      for (const item of activeListings) {

        const metadata = await getNFTMetadata(
          Number(item.tokenId)
        );

        if (!metadata) continue;

        finalNFTs.push({

          ...metadata,

          seller: item.seller,

          price: ethers.formatEther(item.price),

        });

      }

      setAllListings(finalNFTs);

    } catch (err) {

      console.log(err);

    }

    setLoading(false);

  }

  async function handleBuy(tokenId) {

    try {

      await buyNFT(tokenId);

      alert("NFT Purchased Successfully!");

      loadMarketplace();

    } catch (err) {

      alert(err.message);

    }

  }

  const filteredNFTs = allListings.filter(item =>
    item.name.toLowerCase().includes(
      search.toLowerCase()
    )
  );

  return (

    <section className="marketplace">

      <div className="market-header">

        <div>

          <h1>Marketplace</h1>

          <p>

            Browse all NFTs currently listed for sale.

          </p>

        </div>

        <span className="listing-count">

          {filteredNFTs.length} NFT
          {filteredNFTs.length !== 1 && "s"}

        </span>

      </div>

      <div className="market-search">

        <Input

          placeholder="Search NFT by name..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

        />

      </div>

      {

        loading ?

        (

          <h2 className="empty-state">

            Loading NFTs...

          </h2>

        )

        :

        filteredNFTs.length===0 ?

        (

          <h2 className="empty-state">

            No NFTs Found

          </h2>

        )

        :

        (

          <div className="market-grid">

            {

              filteredNFTs.map(item=>(

                <NFTCard

                  key={item.tokenId}

                  image={item.image}

                  name={item.name}

                  description={item.description}

                  tokenId={item.tokenId}

                  seller={item.seller}

                  price={item.price}

                  buttonText="Buy NFT"

                  onClick={()=>handleBuy(item.tokenId)}

                />

              ))

            }

          </div>

        )

      }

    </section>

  );

}

export default Marketplace;
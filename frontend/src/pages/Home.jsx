import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

import { useBlockchain } from "../context/BlockchainContext";

import Button from "../components/Button/Button";
import StatsCard from "../components/StatsCard/StatsCard";
import NFTCard from "../components/NFTCard/NFTCard";

import "../styles/home.css";

function Home() {

  const {
    marketplace,
    getAllListings,
    getNFTMetadata,
  } = useBlockchain();

  const [featuredNFTs, setFeaturedNFTs] = useState([]);

  useEffect(() => {

    if (!marketplace) return;

    loadFeaturedNFTs();

  }, [marketplace]);

  async function loadFeaturedNFTs() {

    try {

      const listings = await getAllListings();

      const activeListings = listings
        .filter(item => item.active)
        .slice(0, 4);

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

      setFeaturedNFTs(finalNFTs);

    } catch (err) {

      console.log(err);

    }

  }

  return (

    <>

      <section className="hero">

        <div className="hero-left">

          <span className="hero-tag">

            DISCOVER • COLLECT • TRADE

          </span>

          <h1>

            Discover, Collect &

            <br />

            Trade <span>Extraordinary NFTs</span>

          </h1>

          <p>

            Mint, list, buy and manage NFTs securely
            on-chain through a clean decentralized marketplace.

          </p>

          <div className="hero-buttons">

            <Link to="/marketplace">

              <Button>

                Explore Marketplace

              </Button>

            </Link>

            <Link to="/mint">

              <Button variant="secondary">

                Mint NFT

              </Button>

            </Link>

          </div>

        </div>

        <div className="hero-right">

          <div className="hero-circle"></div>

        </div>

      </section>

      <section className="stats">

        <StatsCard
          number={featuredNFTs.length}
          text="Active Listings"
        />

        <StatsCard
          number="ERC-721"
          text="NFT Standard"
        />

        <StatsCard
          number="100%"
          text="On Chain"
        />

        <StatsCard
          number="IPFS"
          text="Metadata"
        />

      </section>

      <section className="featured">

        <div className="section-header">

          <h2>

            Featured NFTs

          </h2>

          <Link to="/marketplace">

            View Marketplace →

          </Link>

        </div>

        <div className="featured-grid">

          {

            featuredNFTs.length === 0 ?

            (

              <h3
                style={{
                  color:"#777",
                  gridColumn:"1/-1",
                  textAlign:"center"
                }}
              >

                No NFTs Listed Yet

              </h3>

            )

            :

            (

              featuredNFTs.map(item => (

                <NFTCard

                  key={item.tokenId}

                  image={item.image}

                  name={item.name}

                  description={item.description}

                  tokenId={item.tokenId}

                  seller={item.seller}

                  price={item.price}

                  buttonText="View Marketplace"

                  onClick={() => {

                    window.location.href = "/marketplace";

                  }}

                />

              ))

            )

          }

        </div>

      </section>

    </>

  );

}

export default Home;
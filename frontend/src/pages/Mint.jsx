import { useState } from "react";
import { useBlockchain } from "../context/BlockchainContext";

import Input from "../components/Input/Input";
import Button from "../components/Button/Button";

import "../styles/mint.css";

function Mint() {

  const { mintNFT } = useBlockchain();

  const [tokenURI, setTokenURI] = useState("");

  async function handleMint() {

    try {

      await mintNFT(tokenURI);

      alert("NFT Minted Successfully!");

      setTokenURI("");

    } catch (err) {

      console.log(err);

      alert("Mint Failed");

    }

  }

  return (

    <section className="mint-page">

      <div className="mint-card">

        <h1>Mint NFT</h1>

        <p>
          Upload your metadata URI and mint your NFT on-chain.
        </p>

        <Input
          placeholder="Enter IPFS Metadata URI"
          value={tokenURI}
          onChange={(e)=>setTokenURI(e.target.value)}
        />

        <Button onClick={handleMint}>
          Mint NFT
        </Button>

      </div>

    </section>

  );

}

export default Mint;
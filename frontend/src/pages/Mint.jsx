import { useState } from "react";

import { useBlockchain } from "../context/BlockchainContext";

import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

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

    <div>

      <h1>Mint NFT</h1>

      <Input
        placeholder="Enter Token URI"
        value={tokenURI}
        onChange={(e) => setTokenURI(e.target.value)}
      />

      <br />
      <br />

      <Button onClick={handleMint}>
        Mint NFT
      </Button>

    </div>

  );

}

export default Mint;
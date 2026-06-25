import { useEffect, useState } from "react";
import { useBlockchain } from "../context/BlockchainContext";

function MyNFTs() {

  const { getMyNFTs } = useBlockchain();

  const [myNFTs, setMyNFTs] = useState([]);

  async function loadNFTs() {
    const nfts = await getMyNFTs();
    setMyNFTs(nfts);
  }

  useEffect(() => {
    loadNFTs();
  }, []);

  return (

    <div>

      <h1>My NFTs</h1>

      <button onClick={loadNFTs}>
        Refresh NFTs
      </button>

      <br />
      <br />

      {
        myNFTs.length === 0 && (
          <p>No NFTs Found</p>
        )
      }

      {
        myNFTs.map((item) => (

          <div key={item.tokenId}>

            <img
              src={item.image}
              alt={item.name}
              width="220"
            />

            <h3>{item.name}</h3>

            <p>{item.description}</p>

            <p>
              Token ID :
              {" "}
              {item.tokenId}
            </p>

            <hr />

          </div>

        ))
      }

    </div>

  );

}

export default MyNFTs;
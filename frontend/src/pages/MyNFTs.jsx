import { useEffect, useState } from "react";

import { useBlockchain } from "../context/BlockchainContext";

import NFTCard from "../components/NFTCard/NFTCard";
import Modal from "../components/Modal/Modal";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";

import "../styles/mynfts.css";

function MyNFTs() {

  const {
    getMyNFTs,
    approveNFT,
    listNFT,
  } = useBlockchain();

  const [myNFTs, setMyNFTs] = useState([]);

  const [selectedNFT, setSelectedNFT] = useState(null);

  const [price, setPrice] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    loadNFTs();

  }, []);

  async function loadNFTs() {

    try {

      const nfts = await getMyNFTs();

      setMyNFTs(nfts);

    } catch (err) {

      console.log(err);

    }

  }

  async function handleApprove() {

    try {

      setLoading(true);

      await approveNFT(selectedNFT.tokenId);

      alert("NFT Approved Successfully");

    } catch (err) {

      alert(err.message);

    }

    setLoading(false);

  }

  async function handleList() {

    try {

      setLoading(true);

      await listNFT(
        selectedNFT.tokenId,
        price
      );

      alert("NFT Listed Successfully");

      setSelectedNFT(null);

      setPrice("");

      loadNFTs();

    } catch (err) {

      alert(err.message);

    }

    setLoading(false);

  }

  return (

    <section className="my-nfts">

      <div className="page-header">

        <h1>My NFT Collection</h1>

        <p>

          Manage all NFTs owned by your wallet.

        </p>

      </div>

      <div className="nft-grid">

        {

          myNFTs.length===0 ?

          (

            <h2 className="empty-text">

              No NFTs Found

            </h2>

          )

          :

          (

            myNFTs.map((item)=>(

              <NFTCard

                key={item.tokenId}

                image={item.image}

                name={item.name}

                description={item.description}

                tokenId={item.tokenId}

                buttonText="List NFT"

                onClick={()=>setSelectedNFT(item)}

              />

            ))

          )

        }

      </div>

      <Modal

        open={selectedNFT}

        title="List NFT"

        onClose={()=>{
          setSelectedNFT(null);
          setPrice("");
        }}

      >

        {

          selectedNFT &&

          <>

            <p
              style={{
                color:"#999",
                marginBottom:"20px"
              }}
            >

              Token ID : {selectedNFT.tokenId}

            </p>

            <Input

              placeholder="Enter Price in ETH"

              value={price}

              onChange={(e)=>setPrice(e.target.value)}

            />

            <div
              style={{
                display:"flex",
                gap:"15px",
                marginTop:"25px"
              }}
            >

              <Button
                onClick={handleApprove}
              >

                {

                  loading ?

                  "Approving..."

                  :

                  "Approve NFT"

                }

              </Button>

              <Button
                onClick={handleList}
              >

                {

                  loading ?

                  "Listing..."

                  :

                  "List NFT"

                }

              </Button>

            </div>

          </>

        }

      </Modal>

    </section>

  );

}

export default MyNFTs;
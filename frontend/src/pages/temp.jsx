import { useEffect,useState } from "react";

import { ethers } from "ethers";

import { useBlockchain } from "../context/BlockchainContext";

import NFTCard from "../components/NFTCard/NFTCard";
import Button from "../components/Button/Button";

import "../styles/listed.css";

function ListedNFTs(){

    const{

        getAllListings,

        getNFTMetadata,

        cancelListing,

        wallet

    }=useBlockchain();

    const[listings,setListings]=useState([]);

    useEffect(()=>{

        loadListings();

    },[]);

    async function loadListings(){

        try{

            const data=await getAllListings();

            const mine=[];

            for(const item of data){

                if(
                    !item.active ||
                    item.seller.toLowerCase()!==wallet.toLowerCase()
                ){
                    continue;
                }

                const metadata=
                await getNFTMetadata(
                    Number(item.tokenId)
                );

                if(!metadata) continue;

                mine.push({

                    ...metadata,

                    seller:item.seller,

                    price:ethers.formatEther(item.price)

                });

            }

            setListings(mine);

        }catch(err){

            console.log(err);

        }

    }

    async function handleCancel(tokenId){

        try{

            await cancelListing(tokenId);

            alert("Listing Cancelled");

            loadListings();

        }catch(err){

            alert(err.message);

        }

    }

    return(

        <section className="listed">

            <div className="page-header">

                <h1>

                    Listed NFTs

                </h1>

                <p>

                    NFTs currently available for sale.

                </p>

            </div>

            <div className="listed-grid">

                {

                    listings.length===0 ?

                    <h2 className="empty">

                        No Active Listings

                    </h2>

                    :

                    listings.map(item=>(

                        <div key={item.tokenId}>

                            <NFTCard

                                image={item.image}

                                name={item.name}

                                description={item.description}

                                tokenId={item.tokenId}

                                seller={item.seller}

                                price={item.price}

                            />

                            <Button

                                onClick={()=>handleCancel(item.tokenId)}

                            >

                                Cancel Listing

                            </Button>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default ListedNFTs;
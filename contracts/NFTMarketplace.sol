// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTMarketplace {

    IERC721 public nft;

    struct Listing{
        address seller;
        uint256 price;
    }

    mapping(uint256 => Listing) public listings;

    constructor(address nftAddress){
        nft = IERC721(nftAddress);
    }
    function listNFT(uint256 tokenId, uint256 price) public {
        require(price>0, "Prize must be greater than 0" );
        require(nft.ownerOf(tokenId) == msg.sender, "You are not nft owner" );
        require(nft.getApproved(tokenId) == address(this), "Marketplace not approved" );

        listings[tokenId] = Listing(msg.sender, price);
    }

    function buyNFT(uint256 tokenId) public payable {
        Listing memory listing = listings[tokenId];
        require(listing.seller != address(0),"NFT not listed" );
        // kyuki listed nahi hai to default address 0 ka hi hota hai 

        require(msg.value == listing.price, "Incorrect prize");

        // before sending eth : verify seller still owns eth ?
        require(nft.ownerOf(tokenId) == listing.seller, "Seller no longer owns NFT");
        
        (bool success, )=
          payable(listing.seller).call{
            value: listing.price
          }("");
        require(success, "ETH transfer failed");

        nft.safeTransferFrom(
            listing.seller, 
            msg.sender, 
            tokenId
        );
        delete listings[tokenId];
    }
    //commit
}
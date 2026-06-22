// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTMarketplace {

    // IERC721 public nft;

    struct Listing{
        address seller;
        uint256 price;
    }

    // mapping(uint256 => Listing) public listings;
    mapping(
        address => 
           mapping(
              uint256 => Listing
           )
    ) public listings;
    // now we'll use like listing[nftAddress][tokenId]

    // constructor(address nftAddress){
    //     nft = IERC721(nftAddress);
    // }

    event NFTListed(
        address nftContract,
        uint256 tokenId,
        address seller, 
        uint256 price
    );
    event NFTSold(
        address nftContract,
        uint256 tokenId,
        address buyer
    );
    event NFTCancelled(
        address nftContract,
        uint256 tokenId
    );

    function listNFT(
        address nftContract,
        uint256 tokenId, 
        uint256 price
        ) public {
            IERC721 nft = IERC721(nftContract);

            require(price>0, "Prize must be greater than 0" );
            require(nft.ownerOf(tokenId) == msg.sender, "You are not nft owner" );
            require(nft.getApproved(tokenId) == address(this), "Marketplace not approved" );

            listings[nftContract][tokenId] = Listing(msg.sender, price);

            emit NFTListed(
                nftContract,
                tokenId,
                msg.sender,
                price
            );
        }

    function buyNFT(
        address nftContract,
        uint256 tokenId
        ) public 
          payable {
            IERC721 nft = IERC721(nftContract);

            Listing memory listing = listings[nftContract][tokenId];
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
            delete listings[nftContract][tokenId];  
            emit NFTSold(
                nftContract,
                tokenId,
                msg.sender
             );
    }
    
    function cancelListing(
        address nftContract,
        uint256 tokenId
        ) public {
            // IERC721 nft = IERC721(nftContract);

        Listing memory listing = listings[nftContract][tokenId];
        require(listing.seller != address(0), "not listed");
        require(listing.seller == msg.sender, "not owner");
        delete listings[nftContract][tokenId];

        emit NFTCancelled(
            nftContract,
            tokenId
        );
    }
}
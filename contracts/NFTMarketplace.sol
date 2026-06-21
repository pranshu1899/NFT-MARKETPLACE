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
}
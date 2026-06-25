# 🚀 NFT Marketplace DApp

A fully functional decentralized NFT Marketplace built using **Solidity, Hardhat, React, Ethers.js, OpenZeppelin, and IPFS**.

This DApp allows users to mint NFTs, store metadata on IPFS, list NFTs for sale, purchase NFTs from other users, cancel listings, and manage their NFT collection through an intuitive React frontend.

---

## 📸 Preview

> UI redesign is currently in progress.

---

# ✨ Features

## 🔗 Wallet Connection
- Connect MetaMask wallet
- Display connected wallet address
- Interact with smart contracts using Ethers.js

---

## 🎨 Mint NFTs

- Mint ERC-721 NFTs
- Automatic Token ID generation
- Token URI stored on-chain
- Supports IPFS metadata

---

## ☁️ Decentralized Storage

Images and metadata are stored using **IPFS (Pinata)**.

NFT Metadata includes:

- Name
- Description
- Image
- Attributes (supported)

---

## 🖼 Metadata Rendering

Instead of displaying only Token URIs, the DApp automatically:

- Fetches metadata from IPFS
- Displays NFT Image
- Displays NFT Name
- Displays Description

---

## ✅ NFT Approval

Approve NFTs before listing them on the marketplace.

Uses the standard ERC721 approval mechanism.

---

## 💰 List NFTs

Owners can list NFTs by specifying:

- Token ID
- Price (ETH)

Marketplace verifies:

- NFT Ownership
- Marketplace Approval
- Valid Price

---

## 🛒 Buy NFTs

Purchase listed NFTs securely.

Features:

- Listing verification
- Exact ETH payment validation
- Ownership verification
- Automatic NFT transfer
- Automatic ETH transfer to seller

---

## ❌ Cancel Listings

NFT owners can cancel active listings anytime.

Marketplace verifies:

- NFT is listed
- Caller is the original seller

---

## 📋 Marketplace Listings

View all active marketplace listings.

Displays:

- Token ID
- Seller
- Price

Inactive, sold, or cancelled listings are hidden.

---

## 👤 My NFTs

View NFTs owned by the connected wallet.

Displays:

- NFT Image
- NFT Name
- Description
- Token ID

Ownership is verified directly on-chain.

---

# ⚙ Smart Contract Features

- ERC721 Standard
- ERC721URIStorage
- Multi-NFT Marketplace
- Listing Mapping
- Marketplace Events
- Secure ETH Transfers
- Ownership Verification
- Approval Verification
- Active Listing Tracking

---

# 🛠 Tech Stack

### Blockchain

- Solidity
- Hardhat 3
- OpenZeppelin Contracts

### Frontend

- React
- Vite
- Ethers.js v6

### Wallet

- MetaMask

### Storage

- IPFS
- Pinata

---

# 📂 Project Structure

```
NFT Marketplace
│
├── contracts/
│   ├── MyNFT.sol
│   └── NFTMarketplace.sol
│
├── scripts/
│   └── deploy.js
│
├── frontend/
│   ├── src/
│   ├── App.jsx
│   └── contract/
│
└── README.md
```

---

# 🔄 Workflow

```
Upload Image
      │
      ▼
Upload Image to IPFS
      │
      ▼
Create Metadata.json
      │
      ▼
Upload Metadata to IPFS
      │
      ▼
Mint NFT
      │
      ▼
Approve NFT
      │
      ▼
List NFT
      │
      ▼
Marketplace
      │
      ▼
Buy NFT
      │
      ▼
Ownership Transfers
```

---

# 🚀 Current Status

### ✅ Completed

- MetaMask Integration
- ERC721 NFT Contract
- NFT Minting
- IPFS Metadata Storage
- NFT Approval
- Marketplace Listing
- Buy NFT
- Cancel Listing
- Active Listings
- My NFTs Dashboard
- IPFS Metadata Fetching
- NFT Image Rendering

---

### 🚧 In Progress

- Multi-page React UI
- NFT Cards
- Better Marketplace Design
- Responsive Layout
- Improved User Experience

---

### 📌 Planned Features

- Image Upload directly from Frontend
- Automatic Metadata Generation
- Search & Filters
- Sorting
- Profile Page
- Wishlist
- Loading Animations
- Toast Notifications
- Sepolia Deployment
- Live Demo
- Portfolio Website Integration

---

# 📚 What I Learned

- Building ERC721 Smart Contracts
- OpenZeppelin Standards
- Smart Contract Deployment using Hardhat
- Contract Interaction with Ethers.js
- MetaMask Integration
- React State Management
- NFT Approval Flow
- NFT Marketplace Logic
- Secure ETH Transfers
- IPFS & Pinata Integration
- Fetching NFT Metadata
- Rendering NFTs from IPFS
- Building End-to-End Web3 Applications

---

# 🔮 Future Scope

This project is currently running on a **local Hardhat network** for development and testing.

The next milestone is deploying the complete application to the **Sepolia Testnet**, followed by UI improvements and production-ready features to make it resemble modern NFT marketplaces like OpenSea.

---

## ⭐ If you found this project interesting, consider giving it a star!
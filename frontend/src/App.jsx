import { useState } from "react";
import { ethers } from "ethers";



const App = () => {

  const [wallet, setWallet] = useState("");
  const [nft, setNft] = useState(null);

  async function connectWallet() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setWallet(accounts[0]);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const nftContract = new ethers.Contract(
      address,
      abi,
      signer
    );
    setNft(nftContract);
  }
  return (
    <div>
      <h1>NFT Marketplace</h1>
      <h3>Wallet : {wallet? wallet: "Not connected"} </h3>
      <button onClick={connectWallet}>Connect wallet</button>
    </div>
  )
}

export default App

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Mint from "./pages/Mint";
import MyNFTs from "./pages/MyNFTs";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/mint" element={<Mint />} />
        <Route path="/my-nfts" element={<MyNFTs />} />
      </Routes>
    </>
  );
}

export default App;
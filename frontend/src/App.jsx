import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Layout from "./components/Layout/Layout";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Mint from "./pages/Mint";
import MyNFTs from "./pages/MyNFTs";
import ListedNFTs from "./pages/ListedNFTs";

function App() {
  return (
    <>
      <Navbar />

      <Layout>

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/marketplace"
            element={<Marketplace />}
          />

          <Route
            path="/mint"
            element={<Mint />}
          />

          <Route
            path="/my-nfts"
            element={<MyNFTs />}
          />

          <Route
            path="/listed"
            element={<ListedNFTs />}
          />

        </Routes>

        <Footer />

      </Layout>
    </>
  );
}

export default App;
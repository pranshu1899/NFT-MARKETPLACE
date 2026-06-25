import Button from "../components/Button/Button";
import "../styles/home.css";

function Home() {
  return (
    <section className="hero">
      <div className="hero-left">
        <span className="hero-tag">
          DISCOVER • COLLECT • TRADE
        </span>

        <h1>
          Discover, Collect &
          <br />
          Trade <span>Extraordinary NFTs</span>
        </h1>

        <p>
          The best place to discover, collect and sell amazing NFTs
          from digital creators around the world.
        </p>

        <div className="hero-buttons">
          <Button>Explore Marketplace</Button>
          <Button variant="secondary">
            Mint Your NFT
          </Button>
        </div>
      </div>

      <div className="hero-right">
        <div className="portal"></div>
      </div>
    </section>
  );
}

export default Home;
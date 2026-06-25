import "./Footer.css";

function Footer() {

  return (

    <footer className="footer">

      <div className="footer-top">

        <h2>
          NFT Marketplace
        </h2>

        <p>
          A decentralized NFT marketplace built using React, Solidity,
          Hardhat and Ethers.js. Mint, list, buy and manage NFTs securely
          on the blockchain through a clean and modern user experience.
        </p>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 NFT Marketplace. Built by Pranshu Samadhiya.
        </p>

        <div className="footer-links">

          <a
            href="https://github.com/pranshu1899"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/pranshu-samadhiya-415052380/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>

        </div>

      </div>

    </footer>

  );

}

export default Footer;
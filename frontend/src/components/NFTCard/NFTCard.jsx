import Button from "../Button/Button";

import "./NFTCard.css";

function NFTCard({
  image,
  name,
  description,
  tokenId,
  seller,
  price,
  buttonText,
  onClick,
}) {

  return (

    <div className="nft-card">

      <div className="image-wrapper">

        <img
          src={image}
          alt={name}
          className="nft-image"
        />

      </div>

      <div className="nft-content">

        <div className="title-row">

          <h3>{name}</h3>

          <span className="token-id">

            #{tokenId}

          </span>

        </div>

        <p className="nft-description">

          {description}

        </p>

        {

          seller &&

          <div className="seller">

            Seller

            <span>

              {seller.slice(0,6)}
              ...
              {seller.slice(-4)}

            </span>

          </div>

        }

        {

          price &&

          <div className="price-row">

            <span>

              Price

            </span>

            <h4>

              {price} ETH

            </h4>

          </div>

        }

        {

          buttonText &&

          <Button
            onClick={onClick}
          >

            {buttonText}

          </Button>

        }

      </div>

    </div>

  );

}

export default NFTCard;
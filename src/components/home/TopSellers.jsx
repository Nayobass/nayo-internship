import React, { useEffect, useState } from "react";
import "../UI/TopSellers.css";
import { Link } from "react-router-dom";
import axios from "axios";

const SellerSkeleton = () => (
  <li className="seller-item">
    <div className="author_list_pp">
      <div className="skeleton-wrapper">
        <div className="skeleton skeleton-avatar"></div>
      </div>
    </div>
    <div className="author_list_info">
      <div className="skeleton-wrapper">
        <div className="skeleton skeleton-bar skeleton-name"></div>
      </div>
      <div className="skeleton-wrapper">
        <div className="skeleton skeleton-bar skeleton-price"></div>
      </div>
    </div>
  </li>
);

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getSellers() {
    const response = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setSellers(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getSellers();
  }, []);

  return (
    <section id="section-popular" className="">
      <div className="container">
        <div className="row">
          <div className="">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="">
            <ol className="author_list">
              {loading
                ? Array.from({ length: 12 }).map((_, idx) => (
                    <SellerSkeleton key={idx} />
                  ))
                : sellers.map((seller, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author">{seller.authorName}</Link>
                        <span>{seller.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;

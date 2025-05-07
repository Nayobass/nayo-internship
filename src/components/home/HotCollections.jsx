import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactOwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const options = {
    items: 4,
    loop: true,
    margin: 10,
    nav: true,
    dots: false
  };

  async function getCollections() {
    const response = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setCollections(response.data);
  }

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="hc__container col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <ReactOwlCarousel className="owl-theme" {...options}>
              {collections.map((collection, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img
                        src={collection.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-coll"
                        src={collection.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{collection.title}</h4>
                    </Link>
                    <span>ERC-{collection.code}</span>
                  </div>
                </div>
              ))}
            </ReactOwlCarousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;

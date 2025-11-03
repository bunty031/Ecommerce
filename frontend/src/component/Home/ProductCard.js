import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import "./ProductCard.css"; // ✅ External CSS for clean modular design

const ProductCard = ({ product }) => {
  if (!product) return null;

  const ratingOptions = {
    value: product.ratings || 0,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link to={`/product/${product._id}`} className="product-card">
      <div className="product-image-container">
        <img
          src={product.images?.[0]?.url || "/placeholder.png"}
          alt={product.name || "Product"}
          className="product-image"
        />
      </div>

      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>

        <div className="product-rating">
          <Rating {...ratingOptions} />
          <span className="product-reviews">
            ({product.numOfReviews || 0} Reviews)
          </span>
        </div>

        <p className="product-price">₹{product.price ?? "N/A"}</p>
      </div>
    </Link>
  );
};

export default ProductCard;

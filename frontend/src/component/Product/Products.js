import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";

const categories = [
  "Footwear",
  "Shirts",
  "T-Shirts",
  "Pants",
  "Hoodies",
  "Bags",
  "Other"
];

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;
  const setCurrentPageNo = (e) => setCurrentPage(e);
  const priceHandler = (e, newPrice) => setPrice(newPrice);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    // Always fetch 8 products per page
    dispatch(getProduct(keyword, currentPage, price, category, ratings, 8));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  const resultPerPage = 8;
  let count = filteredProductsCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Products | E-Commerce" />

          <div className="pageLayout">
            {/* Filter Sidebar */}
            <aside className="filterContainer">
              <h3 className="filterTitle">Filter Products</h3>

              <div className="filterSection">
                <Typography>Price Range</Typography>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={25000}
                />
              </div>

              <div className="filterSection">
                <Typography>Category</Typography>
                <ul className="categoryList">
                  {categories.map((cat) => (
                    <li
                      key={cat}
                      className={`categoryItem ${
                        category === cat ? "activeCategory" : ""
                      }`}
                      onClick={() => {
                        setCategory(cat);
                        setCurrentPage(1); // reset to page 1 on category change
                      }}
                    >
                      {cat}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="filterSection">
                <Typography>Ratings Above</Typography>
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => setRatings(newRating)}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              </div>
            </aside>

            {/* Product Section */}
            <main className="productContent">
              <h2 className="productTitle">Our Collection</h2>

              <div className="productGrid">
                {products &&
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>

              {resultPerPage < count && (
                <div className="paginationBox horizontalPagination">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={filteredProductsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="First"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                </div>
              )}
            </main>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;

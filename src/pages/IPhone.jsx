import { Pagination, Rating } from "@mui/material"; // Importing Pagination and Rating components from Material-UI
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from react-redux
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom
import Metadata from "../../Metadata"; // Importing Metadata component for setting page title
import { addToCart } from "../actions/Cart"; // Importing action for adding products to the cart
import { getProducts } from "../actions/Products"; // Importing action for fetching products
import Loading from "./Loading";

// IPhone component for displaying iPhone products
const IPhone = () => {
  // Retrieving products state from Redux store using useSelector hook
  const {
    isLoading,
    products,
    productCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1); // State for current page number

  // Calculating total number of pages based on product count and products per page
  const count =
    productCount && resultPerPage
      ? Math.ceil(filteredProductsCount / resultPerPage)
      : 0;

  const dispatch = useDispatch(); // Creating a dispatch function

  // Function to handle page change in pagination
  const handleChange = (e, page) => {
    setCurrentPage(page); // Setting the current page state
  };

  // Function to handle adding a product to the cart
  const handleAddToCart = (id) => {
    dispatch(addToCart(id)); // Dispatching addToCart action with product ID
  };

  // Fetching products when component mounts or currentPage state changes
  useEffect(() => {
    dispatch(getProducts("", currentPage, [0, 1000000], "Mobile", 0));
  }, [dispatch, currentPage]);

  return (
    <>
      {/* Setting page title */}
      <Metadata title={"IPhone"} />
      {/* Promotional message */}
      <small className="d-flex justify-content-center my-3">
        Get upto 20% off using HDFC credit card.{" "}
        <Link to={"/store"} className="text-decoration-none ms-1">
          Shop now
        </Link>
      </small>
      <div className="container-fluid bg-body-tertiary">
        <div className="row py-3">
          <div className="col">
            {/* Displaying iPhone products */}
            {products && products.length > 0 && (
              <div>
                <h1 className="fw-bold text-center mb-4 allProduct-heading">
                  iPhone
                </h1>
              </div>
            )}
            {/* Displaying loading message if products are still loading */}
            {isLoading ? (
              <Loading />
            ) : (
              <div className="row gy-4 mb-4">
                {/* Mapping through products and displaying each product */}
                {products && products.length > 0 ? (
                  products.map((product) => {
                    return (
                      <div key={product._id} className="col-lg-3">
                        <div className="card rounded-4 border-0 shadow-sm">
                          <img
                            src={product.image[0].url}
                            className="card-img-top rounded-4"
                            style={{
                              height: "300px",
                              width: "100%",
                              objectFit: "contain",
                            }}
                            alt=""
                          />
                          <div className="card-body">
                            <div className="">
                              {/* Link to individual product page */}
                              <Link
                                to={`/product/${product._id}`}
                                className="text-decoration-none text-dark"
                              >
                                {/* Product title */}
                                <span className="card-title mb-0 featured-product-title d-flex justify-content-start d-block px-4">
                                  {product.name}
                                </span>
                              </Link>
                              {/* Product description */}
                              <small
                                className="description"
                                style={{ height: "45px" }}
                              >
                                {product.description}
                              </small>
                            </div>
                            <div className="mt-4 d-flex align-items-center justify-content-between">
                              <div>
                                {/* Product price */}
                                <span className="d-flex justify-content-start featured-product-price">
                                  ₹{product.price}
                                </span>
                              </div>
                              <div>
                                {/* Button to add product to cart */}
                                <button
                                  className="btn add-to-cart-btn btn-sm px-3"
                                  onClick={() => handleAddToCart(product._id)}
                                >
                                  Add to cart
                                </button>
                              </div>
                            </div>
                            {/* Product rating */}
                            <div>
                              <Rating
                                className="d-flex justify-content-start"
                                name="size-small"
                                readOnly
                                value={product.ratings}
                                size="small"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  // Displaying message when there are no products
                  <div className="d-flex justify-content-center pt-5">
                    <h1 className="fw-bold no-products-heading">No Products</h1>
                  </div>
                )}
                {/* Displaying pagination if there are more products than the resultPerPage */}
                {resultPerPage < filteredProductsCount && (
                  <div className="d-flex justify-content-center">
                    {/* Pagination */}
                    <Pagination
                      color="primary"
                      count={count}
                      size="large"
                      page={currentPage}
                      variant="outlined"
                      shape="rounded"
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Promotional message */}
      <small className="d-flex justify-content-center my-3">
        Get upto 20% off using HDFC credit card.{" "}
        <Link to={"/store"} className="text-decoration-none ms-1">
          Shop now
        </Link>
      </small>
    </>
  );
};

export default IPhone;
"use client";
import ProductCard from "@/components/ProductCard";
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context";
import { fetchProducts } from '../../../utils/FetchProducts';
import styles from '../../page.module.css'
import Image from 'next/image'
import ProductLoader from "@/components/Loader/product";
import { toast } from 'react-toastify';

const page = ({ params }) => {
  // const router = useRouter()
  let { productId } = params;
  const { products, setProducts } = useContext(ProductContext);
  const [loading, setLoading] = useState(true); // Loading state

  const currentProduct = products.find((e) => e._id === productId);

  useEffect(() => {
    const loadProducts = async () => {
        const data = await fetchProducts();
        return data
    };

    try {
      if (products.length === 0) {
      loadProducts().then((res) => {
        if (res.status == 200) {
          setProducts(res.products);
          setLoading(false);
        }else{
          setLoading(false)
          toast.error(res.statusText || "Something went wrong")
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
    }else{
      setLoading(false)
    }
    } catch (error) {
        setLoading(false)
        toast.error(error.message);
    }

  }, [products]); // Ensure these dependencies are included


  // Log currentProduct inside the component's render cycle

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rating: 0,
    review: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      const data = { ...formData, product_id: productId };
      let res = await fetch("http://localhost:3000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((data) => {
        if(data.status == 200){
          setFormData({
            name: "",
            location: "",
            rating: 0,
            review: "",
          })
          toast.success("Review successfully submitted!")
          fetchProducts().then(data => {
            if (data.status == 200) {
              setProducts(data.products);
            } else {
              toast.error(data.statusText || "Something went wrong")
            }
          });
        }else{
          toast.error(data.statusText || "Something went wrong")
        }
        
      }).catch(err => {
        toast.error(err.message)
      });
    } catch (error) {
      toast.error(err.message)
    }
  };

  return (
    <>
      {loading ? <ProductLoader /> :
        currentProduct && Object.keys(currentProduct).length > 0 ? (
          <div className="p-5 px-2 my-3 w-100">
            <div className="d-flex flex-column flex-sm-row mb-2 h-75">
              <div
                className="border col-md-6 col-sm-12 mb-3 rounded-3"
                style={{ height: "400px" }}
              >
                <div id="carouselExampleIndicators" className="carousel slide h-100">
                  <div className="carousel-indicators h-100">
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="0"
                      className="active"
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="1"
                      aria-label="Slide 2"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="2"
                      aria-label="Slide 3"
                    ></button>
                  </div>
                  <div className="carousel-inner h-100">
                    {currentProduct.images && currentProduct.images.length > 0 ? (
                      currentProduct.images.map((image, index) => (
                        <div
                          className={`carousel-item h-100 ${index === 0 ? 'active' : ''}`}
                          key={image}
                        >
                          <img
                            src={image}
                            className="d-block w-100 responsive object-fit-contain"
                            style={{ height: "100%" }}
                            alt={currentProduct.name}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="carousel-item active h-100">
                        <img
                          src="/assets/images/product.jpg"
                          className="d-block w-100 responsive object-fit-contain"
                          alt="Sample product"
                          style={{ height: "100%" }}
                        />
                      </div>
                    )}
                  </div>

                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 ps-md-4">
                <div className="border rounded-3 mb-3 p-2">
                  <h4 className="text-secondary">{currentProduct.name}</h4>
                  <h2>&#x20B9;{currentProduct.price}</h2>
                  <div className="my-3">
                    <span className="bg-success text-white rounded-3 p-2">{currentProduct.avgRating}</span>
                    <span className="ms-2">{currentProduct.ratings.length} Reviews</span>
                  </div>
                </div>
                <div className="border bg-success-subtle rounded-3 p-2">
                  <p className="">Sizes available</p>
                  <div className="my-3 d-flex justify-content-around">
                    {currentProduct &&
                      currentProduct.sizes &&
                      currentProduct.sizes.length > 0 ? (
                      currentProduct.sizes.map((size, index) => (
                        <span
                          key={index}
                          className="bg-success text-white rounded-3 p-2"
                        >
                          {size}
                        </span>
                      ))
                    ) : (
                      <span>No sizes available</span>
                    )}
                  </div>
                </div>
                <div className="border rounded-3 p-2 mt-2">
                  <p className="">Colours available</p>
                  <div className="my-3 d-flex justify-content-start flex-wrap">
                    {currentProduct &&
                      currentProduct.colors &&
                      currentProduct.colors.length > 0 ? (
                      currentProduct.colors.map((color, index) => (
                        <span
                          key={index}
                          className={`rounded-3 border p-3 me-1 mb-1 `}
                          style={{backgroundColor : color}}
                        ></span>
                      ))
                    ) : (
                      <span>No colours available</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column flex-sm-row h-25">
              <div className="col-sm-12 col-md-6 border rounded-3 mb-2 p-3">
                <h4>Product details</h4>
                <p>Name : {currentProduct.name}</p>
                <p>Fabric : {currentProduct.fabric ? currentProduct.fabric : 'None'}</p>
                <p>Sleeves length : {currentProduct.sleeves ? currentProduct.sleeves : 'None'}</p>
                <p>Pattern : {currentProduct.Pattern ? currentProduct.Pattern : 'None'}</p>
                <p>Sizes : {currentProduct.sizes.join(", ")}</p>
                <p>Description : {currentProduct.description ? currentProduct.description : 'None'}</p>
              </div>
              <div className="col-sm-12 col-md-6 ps-md-4">
                <h4 className="text-center">Reviews & Rattings</h4>
                <form onSubmit={handleSubmit} className="my-3">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      required
                    />
                    <label htmlFor="name">Name</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City"
                      required
                    />
                    <label htmlFor="location">City</label>
                  </div>

                  <div className="form-floating mb-3">
                    <select
                      className="form-select"
                      id="rating"
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      required
                    >
                      <option value="" defaultValue disabled>
                        Select rating
                      </option>
                      <option value="1">1 Star</option>
                      <option value="2">2 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="5">5 Stars</option>
                    </select>
                    <label htmlFor="rating">Star Rating</label>
                  </div>

                  <div className="form-floating mb-3">
                    <textarea
                      className="form-control"
                      id="review"
                      name="review"
                      value={formData.review}
                      onChange={handleChange}
                      placeholder="Leave a review here"
                      style={{ height: "100px" }}
                    />
                    <label htmlFor="review">Review</label>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit Review
                  </button>
                </form>
                <div className="d-flex overflow-auto w-100">
                  {currentProduct &&
                    currentProduct.ratings.length > 0 &&
                    currentProduct.ratings.map((rating,index) => (
                      <div className={`me-2 ${styles.cReviewCard}`} key={index}>
                        <div className="p-3 rounded-3 border">
                          <div className="d-flex justify-content-between">
                            <h4 className="d-inline">{rating.name}</h4>
                            <div className="d-flex align-items-center">
                              <span className="text-end"><b style={{ fontSize: '23px' }}>{rating.rating}</b></span>
                              <img
                                src="/assets/images/star.jpg"
                                className=""
                                alt="Star"
                                width="25"
                              />
                            </div>
                          </div>
                          <p className="">{rating.location}</p>
                          <hr />
                          <b>{rating.review}</b>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="my-3">
              <h4 className="text-center">People also viewed</h4>
              <div className="d-flex flex-wrap mx-2 mx-md-3">
                {products.map((product, i) => (
                  <a
                    className="text-dark text-decoration-none p-1 my-3 p-md-3 col-6 col-sm-4 col-md-3 overflow-hidden"
                    href={`/products/${product._id}`}
                    style={{ height: "400px" }}
                    key={product._id}
                  >
                    <ProductCard product={product} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="text-center">
              <h1 className="display-4">No Product Found</h1>
              <p className="lead">
                We couldn't find any products matching your search.
              </p>
              <a href="/products" className="btn btn-secondary">
                Browse All Products
              </a>
            </div>
          </div>
        )
      }
    </>
  )

};

export default page;

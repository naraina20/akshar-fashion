"use client";
import ProductCard from "@/components/ProductCard";
import styles from "../page.module.css";
import { useEffect, useState, useContext } from "react";
import { ProductContext } from "../context";
import Link from "next/link";
import { fetchProducts } from "../../utils/FetchProducts";

const page = () => {
  const { products, setProducts } = useContext(ProductContext);
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadProducts = async () => {
      if (products.length === 0) {
        const data = await fetchProducts(currentPage);
        return data;
      }
    };

    loadProducts()
      .then((res) => {
        if (res && res.status == 200) {
          setProducts(res.products);
          setLoading(false);
        }else{
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        setLoading(false);
      });
  }, [products, currentPage]);
  return (
    <div className="d-flex flex-wrap my-5 pt-4 mx-2 mx-md-3" style={{ minHeight: "100vh" }}>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center w-100"
          
        >
          <div className="spinner-border text-primary me-2" role="status"></div>
          <h5 className="m-0">Fetching products...</h5>
        </div>
      ) : products && products.length > 0 ? (
        products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product._id}`}
            passHref
            className="text-dark text-decoration-none p-1 p-md-3 col-xl-2 col-6 col-sm-4 col-md-3 overflow-hidden c-h-card"
          >
            <ProductCard product={product} />
          </Link>
        ))
      ) : (
        <div className="container d-flex flex-column justify-content-center align-items-center my-4">
          <div className="text-center">
            <h1 className="display-4">No Products Found</h1>
            <p className="lead">
              We couldn't find any products matching your search.
            </p>
            <a href="/products" className="btn btn-secondary">
              Browse All Products
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;

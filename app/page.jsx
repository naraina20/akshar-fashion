"use client";
import Image from "next/image";
import styles from "./page.module.css";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState, useContext } from "react";
import { ProductContext } from "./context";
import Link from "next/link";
import { fetchProducts } from '../utils/FetchProducts';

export default function Home() {
  const { products, setProducts } = useContext(ProductContext);
  const [loading, setLoading] = useState(true); // Loading statex

  useEffect(() => {
    const loadProducts = async () => {
      if (products.length === 0) { // Only fetch if no products are in context
        const data = await fetchProducts();
        return data
      }
    };

    try {
      loadProducts().then((res) => {
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
    } catch (error) {
      console.error("Error fetching data", error);
        setLoading(false)
    }
    
  }, [products, setProducts]);

  return (
    <>
      <div className="nav-bg vw-100 vh-100"></div>

      <div className={`d-flex m-auto flex-wrap my-4 ${styles.cWidth}`}>
        {loading? 
          <div className="d-flex justify-content-center align-items-center w-100" style={{height:"80px"}}>
          <div className="spinner-border text-primary me-2" role="status">
          </div>
          <h5 className="m-0">Fetching products...</h5>
        </div>
        : products && products.length > 0 ? (
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
          <div className="container d-flex flex-column justify-content-center align-items-center">
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
    </>
  );
}

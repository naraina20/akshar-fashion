"use client";
import ProductCard from "@/components/ProductCard";
import styles from "../page.module.css";
import { useEffect, useState, useContext } from "react";
import { ProductContext } from "../context";
import Link from "next/link";
import { fetchProducts } from "../../utils/FetchProducts";
import ProductLoader from "@/components/Loader/product";
import { toast } from 'react-toastify';
import Pagination from "@/components/Pagination";

const page = () => {
  const { products, setProducts } = useContext(ProductContext);
  const [loading, setLoading] = useState(true); // Loading state
  const {pagination, setPagination} = useContext(ProductContext);

  useEffect(() => {
    const loadProducts = async () => {
      if (products.length === 0) {
        const data = await fetchProducts(1);
        return data;
      }
    };


    try {
      if (products.length === 0) {
        loadProducts().then((res) => {
          if (res.status == 200) {
            setProducts(res.products);
            setPagination(res.pagination)
            setLoading(false);
          } else {
            setLoading(false)
            toast.error(res.statusText || "Something went wrong")
          }
        })
          .catch((error) => {
            setLoading(false);
            toast.error(error.message);
          });
      } else {
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      toast.error(error.message);
    }
  }, [products]);
  return (
    <div >
      {loading ? (<ProductLoader />) : products && products.length > 0 ? (
        <>
        <div className="d-flex flex-wrap my-5 pt-4 mx-2 mx-md-3" style={{ minHeight: "80vh" }}>
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              passHref
              className="text-dark text-decoration-none p-1 p-md-3 col-xl-2 col-6 col-sm-4 col-md-3 overflow-hidden c-h-card"
            >
              <ProductCard product={product} />
            </Link>
          ))}
          </div>
          <div className="w-100 d-flex align-items-center justify-content-center">
          <Pagination initPagination={pagination}/>
          </div>
          </>
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

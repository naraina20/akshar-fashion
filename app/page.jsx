"use client"
import Image from "next/image";
import styles from "./page.module.css";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";


export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await fetch("https://lp19nf4c-3000.inc1.devtunnels.ms/api/products", {
          method: "GET",
        });

        let allPosts = await res.json();
        console.log('allPosts', allPosts);
        setProducts(allPosts.data)
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();

  }, [])
  return (
    <>
      <div className='nav-bg vw-100 vh-100'>
      </div>
      {/* <div className="my-3 w-75 mx-2 mx-md-3" > */}
        <div className="d-flex w-100 flex-wrap">
          {
            products.map(product => (
              <a
                key={product._id}
                className="text-dark text-decoration-none p-1 p-md-3 col-6 col-sm-4 col-md-3 overflow-hidden c-h-card"
                href={`/products/${product._id}`}
              >
                <ProductCard product={product} />
              </a>
            ))
          }
        </div>
      {/* </div> */}
    </>
  );
}

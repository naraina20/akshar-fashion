"use client"
import Image from "next/image";
import styles from "./page.module.css";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <>
    <div className='nav-bg vw-100 vh-100'>
    </div>
    <div className="my-3 w-75 m-auto" >
      <div className="d-flex w-100 flex-wrap">
      <a className="text-dark text-decoration-none p-1 p-md-3 col-6 col-sm-4 col-md-3 overflow-hidden c-h-card" href="/products/1">
        <ProductCard />
      </a>
      
      <a className="text-dark text-decoration-none p-1 p-md-3 col-6 col-sm-4 col-md-3 overflow-hidden c-h-card" href="/products/1">
        <ProductCard />
      </a>
      
      <a className="text-dark text-decoration-none p-1 p-md-3 col-6 col-sm-4 col-md-3 overflow-hidden c-h-card" href="/products/1">
        <ProductCard />
      </a>
      
      <a className="text-dark text-decoration-none p-1 p-md-3 col-6 col-sm-4 col-md-3 overflow-hidden c-h-card" href="/products/1">
        <ProductCard />
      </a>
      
      <a className="text-dark text-decoration-none p-1 p-md-3 col-6 col-sm-4 col-md-3 overflow-hidden c-h-card" href="/products/1">
        <ProductCard />
      </a>
       
      </div>
    </div>
    </>
  );
}

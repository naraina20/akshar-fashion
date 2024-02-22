"use client"
import Image from "next/image";
import styles from "./page.module.css";
import ProductCart from "@/components/ProductCart";

export default function Home() {
  return (
    <div className="my-3 w-75 m-auto" >
      <div className="d-flex w-100 flex-wrap">
        <div className="p-3 col-6 overflow-hidden c-h-card">
          <ProductCart />
        </div>
        <div className="col-6  p-3 overflow-hidden c-h-card">
          <ProductCart />
        </div>
        
       
       
      </div>
    </div>
  );
}

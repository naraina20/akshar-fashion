"use client"; // Ensure this is a client-side component

import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Correct import
import { ProductContext } from "../app/context";
import { fetchProducts } from '../utils/FetchProducts';

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const { products, setProducts } = useContext(ProductContext);
  const router = useRouter();

  const handleLinkClick = () => {
    setIsNavOpen(false);
  };

  const changeBackgroundColor = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const handleSearch = (e) => {
    console.log('search****')
    fetchProducts({ search: searchInput }).then(res => {
      if (res.status == 200) {
        setProducts(res.products)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    const handleRouteChange = () => {
      setIsNavOpen(false);
    };

    // Listen for route changes
    router.events?.on("routeChangeStart", handleRouteChange);

    window.addEventListener("scroll", changeBackgroundColor);

    return () => {
      router.events?.off("routeChangeStart", handleRouteChange);
      window.removeEventListener("scroll", changeBackgroundColor);
    };
  }, [router]);

  return (
    <nav
      className={
        navbar
          ? "navbar navbar-expand-lg fixed-top nav-active"
          : "navbar navbar-expand-lg fixed-top bg-dark bg-opacity-50"
      }
    >
      <div className="container m-auto">
        <Link href="/" className="navbar-brand" style={navbar ? { color: "black" } : { color: "white" }}>
          test
        </Link>
        <button
          className={
            navbar
              ? "navbar-toggler border-black"
              : "navbar-toggler border-white"
          }
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <span
            className={
              navbar
                ? "navbar-toggler-icon navbar-light"
                : "navbar-toggler-icon navbar-dark"
            }
          ></span>
        </button>
        <div
          className={`collapse navbar-collapse justify-content-between ${isNavOpen ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <div className="d-flex flex-column flex-md-row w-100 justify-content-between">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/" className="nav-link active" aria-current="page" style={navbar ? { color: "black" } : { color: "white" }} onClick={handleLinkClick}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/products" className="nav-link" style={navbar ? { color: "black" } : { color: "white" }} onClick={handleLinkClick}>
                  Products
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={navbar ? { color: "black" } : { color: "white" }}>
                  Categories
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="/products" className="dropdown-item" onClick={handleLinkClick}>
                      Shirts
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link href="/products" className="dropdown-item" onClick={handleLinkClick}>
                      Pants
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link href="/about" className="nav-link" style={navbar ? { color: "black" } : { color: "white" }} onClick={handleLinkClick}>
                  About
                </Link>
              </li>
            </ul>
            <div className="d-flex form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2 me-2" name="search" type="search" placeholder="Search" aria-label="Search" onChange={e => setSearchInput(e.target.value)} />
              <button className={`btn btn-outline-success my-2 my-sm-0`} onClick={handleSearch} type="button">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

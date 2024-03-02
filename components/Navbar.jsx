"use client";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

  const changeBackgroundColor = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }

    // console.log(window.scrollY)
  };

  function show() {
    let element = document.getElementById("navbarSupportedContent");
    console.log(element, "mera element");
    if (element.classList.contains("show")) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", changeBackgroundColor);
  }, []);

  return (
    <nav
      className={
        navbar
          ? "navbar navbar-expand-lg fixed-top nav-active"
          : "navbar navbar-expand-lg fixed-top bg-dark bg-opacity-50"
      }
    >
      <div className="container m-auto">
        <a
          className="navbar-brand"
          href="#"
          style={navbar ? { color: "black" } : { color: "white" }}
        >
          Navbar
        </a>
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
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setTimeout(() => show(), 400)}
        >
          <span
            className={
              navbar
                ? "navbar-toggler-icon navbar-light"
                : "navbar-toggler-icon navbar-dark"
            }
          ></span>
          {/* <b><i className="bi bi-list" style={navbar ? {color : 'black'} : {color : 'black'}}></i></b> */}
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          <div className="d-flex flex-column flex-md-row w-100 justify-content-between">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/"
                  style={navbar ? { color: "black" } : { color: "white" }}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/products"
                  style={navbar ? { color: "black" } : { color: "white" }}
                >
                  Products
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={navbar ? { color: "black" } : { color: "white" }}
                >
                  Categories
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/products">
                      Shirts
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="/products">
                      Pants
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/about"
                  style={navbar ? { color: "black" } : { color: "white" }}
                >
                  About
                </a>
              </li>
            </ul>
            <form class="d-flex form-inline my-2 my-lg-0">
              <input
                class="form-control mr-sm-2 me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                class="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

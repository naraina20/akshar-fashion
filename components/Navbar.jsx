"use client"
import React, { useEffect, useState } from 'react'

const Navbar = () => {
  const [navbar, setNavbar] = useState(false)

  const changeBackgroundColor = () =>{
    if(window.scrollY >=80){
      setNavbar(true)
      console.log("ho gyaaaa")
    }else{
      setNavbar(false)
      console.log('fir se ho gya')
    }

    // console.log(window.scrollY)
  }

  function show(){
    let element = document.getElementById('navbarSupportedContent');
    console.log(element, 'mera element')
    if(element.classList.contains('show')){
      
      setNavbar(true)
    }else{
      setNavbar(false)
    }
  }

  useEffect(() => {
    
    window.addEventListener("scroll", changeBackgroundColor)
    
  }, [])
  


  return (
     <nav className={navbar ? 'navbar navbar-expand-lg fixed-top nav-active':'navbar navbar-expand-lg fixed-top bg-dark bg-opacity-50'}>
      <div className="container m-auto">
        <a className="navbar-brand" href="#" style={navbar ? {color : 'black'} : {color : 'white'}}>
          Navbar
        </a>
        <button
          className={navbar ? "navbar-toggler border-black":"navbar-toggler border-white"}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={()=> setTimeout(() => show(), 400) }
          
        >
          <span className={navbar ? 'navbar-toggler-icon navbar-light':'navbar-toggler-icon navbar-dark'} ></span>
          {/* <b><i className="bi bi-list" style={navbar ? {color : 'black'} : {color : 'black'}}></i></b> */}
        </button>
        <div  className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
           <div className="d-flex w-100 justify-content-between"> 
          <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#"  style={navbar ? {color : 'black'} : {color : 'white'}}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" style={navbar ? {color : 'black'} : {color : 'white'}}>
                  Link
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={navbar ? {color : 'black'} : {color : 'white'}}
                >
                  Categories
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      First cat
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                    Second cat
                    </a>
                  </li>
                  
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true" style={navbar ? {color : 'black'} : {color : 'white'}}>
                  Disabled
                </a>
              </li>
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0 ">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#" style={navbar ? {color : 'black'} : {color : 'white'}}>
                  Search
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#" style={navbar ? {color : 'black'} : {color : 'white'}}>
                  Profile
                </a>
              </li>
            </ul>
           </div> 
        </div>
      </div>
    </nav> 

    
  )
}

export default Navbar

import React from "react";

const page = () => {
  return (
    <div className="p-5 px-2 vh-100 w-100">
      <div className="d-flex flex-column flex-sm-row mb-2 h-75">
        <div className="border col-md-6 col-sm-12 h-75 mb-3 rounded-3">
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
              <div className="carousel-item active h-100">
                <img
                  src="/assets/images/choro.jpg"
                  className="d-block w-100 responsive object-fit-contain"
                  style={{ height: "100%" }}
                  alt="..."
                />
              </div>
              <div className="carousel-item h-100">
                <img
                  src="/assets/images/product.jpg"
                  className="d-block w-100 responsive object-fit-contain"
                  alt="..."
                  style={{ height: "100%" }}
                />
              </div>
              <div className="carousel-item h-100">
                <img
                  src="/assets/images/navImage.jpeg"
                  className="d-block w-100 responsive object-fit-contain"
                  alt="..."
                  style={{ height: "100%" }}
                />
              </div>
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
            <h4 className="text-secondary">Product title</h4>
            <h2>$345</h2>
            <div className="my-3">
              <span className="bg-success text-white rounded-3 p-2">3.5</span>
              <span className="ms-2">15 Ratting, 14 Reviews</span>
            </div>
          </div>
          <div className="border bg-success-subtle rounded-3 p-2">
            <p className="">Sizes available</p>
            <div className="my-3 d-flex justify-content-around">
              <span className="bg-success text-white rounded-3 p-2">3.5</span>
              <span className="bg-success text-white rounded-3 p-2">3.5</span>
              <span className="bg-success text-white rounded-3 p-2">3.5</span>
              <span className="bg-success text-white rounded-3 p-2">3.5</span>
              <span className="bg-success text-white rounded-3 p-2">3.5</span>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex flex-column flex-sm-row h-25">
        <div className="col-sm-12 col-md-6 border rounded-3 mb-2 p-3">
          <h4>Product details</h4>
          <p>Name : Mera Shirt</p>
          <p>fabric : Mera Shirt</p>
          <p>Sleeves length : Mera Shirt</p>
          <p>Pattern : Mera Shirt</p>
          <p>Sizes : Mera Shirt</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente voluptate dicta laborum quas ut accusantium deserunt repellat eum maxime dolores!</p>
        </div>
        <div className="col-sm-12 col-md-6 ps-md-4">
          <h4 className="text-center">Reviews & Rattings</h4>
          <div className="d-flex flex-column">
            <div className="p-3 rounded-3 border">
                <h4 className="text-secondary d-inline">Mera name</h4>
                <span className="text-end">5</span>
                <p className="">Location</p>
                <b>bhot bdiay h ye t-shirt kharid lo sahab</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

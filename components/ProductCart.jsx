import React from 'react'
import Image from 'next/image'

const ProductCart = () => {
  return (
    <div className="border w-100 h-100 overflow-hidden rounded-top-2" >
      <img className="card-img-top responsive object-fit-scale c-h-card-img" src="/assets/images/product.jpg" alt="Card image cap"/>
  <div className="card-body h-100 p-2">
    {/* <div> */}
    {/* <Image
      src="/assets/images/product.jpg"
      width={100}
      height={100}
      alt="Picture of the author"
    /> */}
      
    {/* </div> */}
   <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
  </div>
</div>
  )
}

export default ProductCart

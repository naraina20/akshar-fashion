import React from 'react'
import Image from 'next/image'

const ProductCard = () => {
  return (
    <div className="border w-100 h-100 overflow-hidden rounded-top-2" >
      <img className="card-img-top responsive object-fit-scale c-h-card-img" src="/assets/images/product.jpg" height='70%' alt="Card image cap"/>
  <div className="card-body h-25 p-2 d-flex flex-column justify-content-between">
   <h6 className="card-title mb-2 text-secondary">Product Name</h6>
   <h6 className='mb-3'>&#x20B9;345</h6>
   <div>
   <span className="bg-success text-white rounded-3 p-2 me-1">3.5</span>
   <span className='text-secondary'>20 Reviews</span>
   </div>
  </div>
</div>
  )
}

export default ProductCard

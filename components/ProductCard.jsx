import React from 'react'
import Image from 'next/image'

const ProductCard = ({product}) => {
  return (
    <div className="border w-100 h-100 overflow-hidden rounded-top-2" >
      <img className="card-img-top responsive object-fit-scale c-h-card-img" src={product.images[0]?product.images[0]:'/assets/images/product.jpg'} height='70%' alt="Card image cap"/>
  <div className="card-body h-25 p-2 d-flex flex-column justify-content-between">
   <h6 className="card-title mb-2 text-secondary">{product.name}</h6>
   <h6 className='mb-3'>&#x20B9;{product.price}</h6>
   <div>
   <span className="bg-success text-white rounded-3 p-2 me-1">{product.avgRating} <span style={{fontSize : '18px'}}>&#9733;</span></span>
   <span className='text-secondary'>{product.ratings.length} Reviews</span>
   </div>
  </div>
</div>
  )
}

export default ProductCard

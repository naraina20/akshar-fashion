import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req) {
    try{
  
      const bodyText = await req.text();
      const {product_id,name,rating,location,review} = JSON.parse(bodyText);
      console.log(product_id,name,rating,location,review)
  
      const client = await clientPromise;
      const db = client.db('akshar_fashion');
      const collection = db.collection('products');
  
      // Create the rating object
      const newRating = {
        _id: new ObjectId(),
        name,
        rating,
        location,
        review,
      };
  
      // Perform the update operation to add the rating to the product's ratings array
      const result = await collection.updateOne(
        { _id: new ObjectId(product_id) }, // Filter by the document's _id
        { $push: { ratings: newRating } } // Add the new rating to the ratings array
      );
  
      if (result.matchedCount === 0) {
        return NextResponse.json({
          message: 'No matching product found',
        }, { status: 404 });
      }
  
      return NextResponse.json({
        message: 'Rating added successfully',
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
      });
    } catch (error) {
      console.error('Error adding rating:', error);
      return NextResponse.json({
        message: 'Error adding rating',
        error: error.message,
      }, { status: 500 });
    }
  }
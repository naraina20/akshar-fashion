import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req) {
  try {
    const bodyText = await req.text();
    const bodyObject = JSON.parse(bodyText);

    // Validate the product data here if necessary

    const client = await clientPromise;
    const db = client.db('akshar_fashion');
    const collection = db.collection('products');

    const result = await collection.insertOne({...bodyObject, ratings : [], avgRating : 3});

    return NextResponse.json({
      message: 'Product added successfully',
      productId: result.insertedId,
    });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({
      message: 'Error adding product',
      error: error.message,
    }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db('akshar_fashion');
    const collection = db.collection('products');

    const allProducts = await collection.find({}).toArray();

    return NextResponse.json({
      status: 200,
      products: allProducts,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({
      message: 'Error in fetching products',
      error: error.message,
    }, { status: 500, message : "Error in fetching products" });
  }
}

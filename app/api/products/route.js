import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { prefetchDNS } from 'react-dom';

export async function POST(req) {
  try {
    const bodyText = await req.text();
    const bodyObject = JSON.parse(bodyText);

    // Validate the product data here if necessary

    const client = await clientPromise;
    const db = client.db('akshar_fashion');
    const collection = db.collection('products');

    const result = await collection.insertOne({...bodyObject, ratings : [], avgRating : 3});
    console.log('insertion ==>> ', result)

    return NextResponse.json({
      message: 'Product added successfully',
      productId: result.insertedId,
    });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({
      error: 'Error in create new product',
    },{status : 500});
  }
}

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db('akshar_fashion');
    const collection = db.collection('products');
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    // Default values
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';

    // Pagination and search filter
    const skip = (page - 1) * limit;

    let query = {};

    // If there is a search term, modify the query to search in product_name, category, and price
    if (search) {
      const searchNumber = Number(search);  // Check if search is a number (price check)
      
      // If the search term is a number, it will be used to search the price
      if (!isNaN(searchNumber)) {
        query = {
          $or: [
            { price: searchNumber }, // Search for price
          ],
        };
      } else {
        // If the search term is not a number, search in product_name and category
        query = {
          $or: [
            { product_name: { $regex: search, $options: 'i' } }, // search in product_name
            { category: { $regex: search, $options: 'i' } }, // search in category
          ],
        };
      }
    }

    // Fetch filtered products
    const products = await collection
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray();

    // Optionally, count total products for pagination information
    const totalCount = await collection.countDocuments(query);

    return NextResponse.json({
      status: 200,
      products,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        error: 'Error in fetching products',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req){
  try{
  const { searchParams } = new URL(req.url);
    const productId = searchParams.get("id"); // Get the product ID from query params

    const client = await clientPromise;
    const db = client.db('akshar_fashion');
    const collection = db.collection('products');

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const deletedProduct = await collection.deleteOne({ _id: new ObjectId(productId) });

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  }catch(err){
    console.log('error in delete product ', err)
    return NextResponse.json({ error: "Error in delete product" }, { status: 500 });
  }
}


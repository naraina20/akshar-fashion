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
        message: 'Error in fetching products',
        error: error.message,
      },
      { status: 500 }
    );
  }
}


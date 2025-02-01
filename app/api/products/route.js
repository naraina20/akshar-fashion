import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { google } from 'googleapis';
import { Readable } from 'stream';
import axios from 'axios';

// Setup Google Drive API credentials
const apikeys = require('../../../utils/apikeys.json');
const SCOPE = ['https://www.googleapis.com/auth/drive'];

export async function POST(req) {
  try {
    const bodyText = await req.text();
    const bodyObject = JSON.parse(bodyText);
    console.log('product ', bodyObject)

    const { name, sizes, price, description, category, colors, stock, images } = bodyObject;


    if (!images || !Array.isArray(images)) {
      return NextResponse.json(
        { message: 'No images provided or invalid format' },
        { status: 400 }
      );
    }

    // Authorize with Google Drive
    const authClient = await authorize();

    // Upload each image and collect their public URLs
    const imageUrls = [];
    for (const [index, base64Image] of images.entries()) {
      const fileName = `${name || 'product'}-image-${index + 1}.png`;
      const fileId = await uploadImageToDrive(name, authClient, base64Image, fileName);
      const publicUrl = await makeFilePublic(authClient, fileId);
      imageUrls.push(publicUrl);
    }

    // Save the product data to MongoDB
    const client = await clientPromise;
    const db = client.db('akshar_fashion');
    const collection = db.collection('products');

    const result = await collection.insertOne({
      name,
      sizes,
      price,
      description,
      category,
      colors,
      stock,
      images: imageUrls, // Store the public URLs of the uploaded images
      ratings: [],
      avgRating: 3,
    });

    return NextResponse.json({
      message: 'Product and images added successfully',
      productId: result.insertedId,
      images: imageUrls,
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
    console.log('search ', search)

    // Pagination and search filter
    const skip = (page - 1) * limit;

    let query = {};

    // If there is a search term, modify the query to search in product_name, category, and price
    if (search) {
      const searchNumber = Number(search);  // Check if search is a number (price check)
      console.log('searching ====', typeof(searchNumber))
      
      // If the search term is a number, it will be used to search the price
      if (!isNaN(searchNumber)) {
        console.log('its a number')
        query = {
          $or: [
            { price: searchNumber }, // Search for price
          ],
        };
      } else {
        // If the search term is not a number, search in product_name and category
        query = {
          $or: [
            { name: { $regex: search, $options: 'i' } }, // search in product_name
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


// A function to provide access to Google Drive API
async function authorize() {
  const jwtClient = new google.auth.JWT(
      apikeys.client_email,
      null,
      apikeys.private_key.replace(/\\n/g, '\n'), // Ensure private key formatting
      SCOPE
  );

  await jwtClient.authorize();

  return jwtClient;
}

async function makeFilePublic(authClient, fileId) {
const drive = google.drive({ version: 'v3', auth: authClient });

console.log('drive ', drive )

// Set file permissions to public
await drive.permissions.create({
  fileId: fileId,
  requestBody: {
    role: 'reader',
    type: 'anyone',
  },
});

// Return the public URL of the file
return `https://drive.google.com/uc?id=${fileId}`;
}

// Function to upload an image to Google Drive
async function uploadImageToDrive(name,authClient, base64Image, fileName) {
const drive = google.drive({ version: 'v3', auth: authClient });

// Extract MIME type and Base64 content from the image string
const matches = base64Image.match(/^data:(.+);base64,(.+)$/);
if (!matches) {
  throw new Error('Invalid image format');
}
const mimeType = matches[1];
const imageBuffer = Buffer.from(matches[2], 'base64');

const fileMetaData = {
  name: fileName || `${name | 'product'}-${ObjectId}`,
  parents: ['1X8RMX58q7B0E9Ssr54WdY6aeCElSR8f7'], // Your folder ID
};

// Convert Buffer to a readable stream
const imageStream = new Readable();
imageStream.push(imageBuffer);
imageStream.push(null); // Signals the end of the stream

const media = {
  mimeType: mimeType,
  body: imageStream,
};

const driveResponse = await drive.files.create({
  resource: fileMetaData,
  media: media,
  fields: 'id',
});

// Return the uploaded file ID
return driveResponse.data.id;
}

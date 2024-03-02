// posts.js
import { NextResponse } from "next/server";

// import clientPromise from "../../lib/mongodb";

// export default async function handler(req, res) {
//     //   const client = await clientPromise;
//     //   const db = client.db("akshar-fashion");
//       switch (req.method) {
//         case "POST":
//         //   let bodyObject = JSON.parse(req.body);
//         //   let myPost = await db.collection("products").insertOne(bodyObject);
//           res.json('hello');
//           break;
//         case "GET":
//           const allPosts = await db.collection("allPosts").find({}).toArray();
//           res.json({ status: 200, data: allPosts });
//           break;
//       }
//     }

    export async function GET(req,res){
        return NextResponse.json({ message: "Hello World" });
    }
import express, { Request, Response } from "express";
import cors from "cors";
import { MongoClient, InsertOneResult } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from server!" });
});

app.get("/messages", async (_req: Request, res: Response) => {
  try {
    const database = client.db("form-Data-vue");
    const collection = database.collection("messages");

    const messages = await collection.find().toArray();

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages from MongoDB:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const MONGODB_URL = process.env.MONGODB_URI || "";

const client = new MongoClient(MONGODB_URL, {
  tlsAllowInvalidCertificates: true,  // Disable certificate validation for development
  serverSelectionTimeoutMS: 50000,    // Increase server selection timeout
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB cluster");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

connectToMongoDB();

app.use(express.urlencoded({ extended: true }));

app.post("/messages", async (req: Request, res: Response) => {
  const { email, message } = req.body;
  console.log(`Received email: ${email}, message: ${message}`);

  try {
    const database = client.db("form-Data-vue");
    const collection = database.collection("messages");

    const insertResult: InsertOneResult = await collection.insertOne({
      email,
      message,
      createdAt: new Date(),
    });

    res.json({
      message: "Data received and saved successfully",
      data: insertResult.insertedId,
    });
  } catch (error) {
    console.error("Error inserting document into MongoDB:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
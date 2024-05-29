import exp from "express";
import cors from "cors";
import { MongoClient, InsertOneResult } from "mongodb";

const app = exp();

app.use(exp.json());
app.use(cors());

const PORT = process.env.PORT || 3000; 

app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/messages", async (req, res) => {
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

const client = new MongoClient(MONGODB_URL);

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

app.post("/messages", async (req, res) => {
  const { email, message } = req.body;
  console.log(
    `Received email: ${email}, message: ${message}`
  );

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
      data: insertResult.insertedId[0], 
    });
  } catch (error) {
    console.error("Error inserting document into MongoDB:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

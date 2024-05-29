"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 3000;
app.get("/", (res) => {
    res.json({ message: "Hello from server!" });
});
app.get("/messages", (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const database = client.db("form-Data-vue");
        const collection = database.collection("messages");
        const messages = yield collection.find().toArray();
        res.json(messages);
    }
    catch (error) {
        console.error("Error fetching messages from MongoDB:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
const MONGODB_URL = process.env.MONGODB_URI || "";
const client = new mongodb_1.MongoClient(MONGODB_URL);
function connectToMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Connected to MongoDB cluster");
        }
        catch (error) {
            console.error("Error connecting to MongoDB:", error);
            process.exit(1);
        }
    });
}
connectToMongoDB();
app.use(express_1.default.urlencoded({ extended: true }));
app.post("/messages", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, message } = req.body;
    console.log(`Received email: ${email}, message: ${message}`);
    try {
        const database = client.db("form-Data-vue");
        const collection = database.collection("messages");
        const insertResult = yield collection.insertOne({
            email,
            message,
            createdAt: new Date(),
        });
        res.json({
            message: "Data received and saved successfully",
            data: insertResult.insertedId,
        });
    }
    catch (error) {
        console.error("Error inserting document into MongoDB:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});

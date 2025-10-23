import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";
import { UserSchema, ChatSchema, MessageSchema } from "../models/user.ts";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
import cors from "cors";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
const db = process.env.MONGODB_URI as string;
const PORT = process.env.PORT;
app.use("/avatars", express.static(path.join(__dirname, "../public/avatars")));
app.use(express.json());

mongoose
  .connect(db)
  .then(() => {
    console.log("Connected to MondoDB");
    app.listen(PORT);
  })
  .catch((err) => console.log("Failed to connect to MongoDB", err));

console.log("merwer");

const User = mongoose.model("user", UserSchema);

const avatars = [
  "avatar-1.jpg",
  "avatar-2.jpg",
  "avatar-3.jpg",
  "avatar-4.jpg",
  "avatar-5.jpg",
  "avatar-6.jpg",
  "avatar-7.jpg",
];

app.post("/api/users/init", async (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  console.log(id);
  if (!id) {
    return res.status(400).json({ error: "Id is required" });
  }
  try {
    let user = await User.findOne({ id });

    if (!user) {
      const premadeChats = [
        {
          chatId: uuidv4(),
          chatDate: new Date(),
          avatar: `/avatars/${
            avatars[Math.floor(Math.random() * avatars.length)]
          }`,
          sender: { name: "Alice Freeman" },
          messages: [
            {
              messageId: uuidv4(),
              senderOfMessage: "system",
              content: "How was your meeting?",
              created: new Date(),
            },
          ],
        },
        {
          chatId: uuidv4(),
          chatDate: new Date(),
          avatar: `/avatars/${
            avatars[Math.floor(Math.random() * avatars.length)]
          }`,
          sender: { name: "Josephina Pit" },
          messages: [
            {
              messageId: uuidv4(),
              senderOfMessage: "system",
              content: "Hi! No, I am going for a walk.",
              created: new Date(),
            },
          ],
        },
        {
          chatId: uuidv4(),
          chatDate: new Date(),
          avatar: `/avatars/${
            avatars[Math.floor(Math.random() * avatars.length)]
          }`,
          sender: { name: "Velazquez Smith" },
          messages: [
            {
              messageId: uuidv4(),
              senderOfMessage: "system",
              content: "Hi! I am a little sad, tell me a joke please.",
              created: new Date(),
            },
          ],
        },
      ];

      user = new User({
        id,
        chats: premadeChats,
      });
      await user.save();
    }

    res.send(user);
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ error: "Server error" });
  }
});

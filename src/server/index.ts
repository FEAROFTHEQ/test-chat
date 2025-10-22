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
app.use(express.json());

mongoose
  .connect(db)
  .then(() => {
    console.log("Connected to MondoDB", db);
    app.listen(PORT);
  })
  .catch((err) => console.log("Failed to connect to MongoDB", err));

console.log("merwer");

const User = mongoose.model("user", UserSchema);
app.use("/public", express.static(path.join(__dirname, "../../public")));

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
      const avatars = [
        "avatar-1.png",
        "avatar-2.png",
        "avatar-3.png",
        "avatar-4.png",
        "avatar-5.png",
        "avatar-6.png",
        "avatar-7.png",
      ];

      const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

      user = new User({
        id,
        avatar: `/avatars/${randomAvatar}`,
        chats: premadeChats,
      });

      await user.save();
      console.log("User saved:", user);
    }

    res.send(user);
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ error: "Server error" });
  }
});

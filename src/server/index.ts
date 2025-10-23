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

function getRandomAvatar() {
  return `/avatars/${avatars[Math.floor(Math.random() * avatars.length)]}`;
}

app.post("/api/users/init", async (req, res) => {
  const { id } = req.body;
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
          avatar: getRandomAvatar(),
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
          avatar: getRandomAvatar(),
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
          avatar: getRandomAvatar(),
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

app.post("/api/create/:userId", async (req, res) => {
  const { userId } = req.params;
  const { userData } = req.body;
  console.log(userData);
  if (!userId || !userData) {
    return res.status(400).json({ error: "Missing userId or chatData" });
  }

  try {
    const user = await User.findOne({ id: userId });
    if (!user) return res.status(404).json({ error: "User not found" });
    const senderName = `${userData.firstName} ${userData.lastName}`;
    console.log(senderName);
    const newChat = {
      chatId: uuidv4(),
      chatDate: new Date(),
      avatar: getRandomAvatar(),
      sender: { name: senderName },
      messages: [],
    };

    user.chats.push(newChat);
    await user.save();

    res.send(newChat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/chats/:chatId/messages", async (req, res) => {
  const { chatId } = req.params;
  const { content } = req.body;
  console.log(content);
  if (!content) {
    return res.status(400).json({ error: "Missing content" });
  }
  try {
    const user = await User.findOne({ "chats.chatId": chatId });
    if (!user) return res.status(404).json({ error: "Chat not found" });

    const chat = user.chats.find((c) => c.chatId === chatId);
    if (!chat) return res.status(404).json({ error: "Chat not found" });

    const newMessage = {
      messageId: uuidv4(),
      senderOfMessage: "user",
      content,
      created: new Date(),
    };

    chat.messages.push(newMessage);
    await user.save();

    res.send(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

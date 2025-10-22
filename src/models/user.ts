import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    messageId: { type: String, required: true },
    senderOfMessage: { type: String, enum: ["user", "system"], required: true },
    content: { type: String, required: true },
    created: { type: Date, default: Date.now },
  },
  { _id: false }
);

const ChatSchema = new Schema(
  {
    chatId: { type: String, required: true },
    chatDate: { type: Date, default: Date.now },
    sender: {
      name: { type: String, required: false },
    },
    messages: [MessageSchema],
  },
  { _id: false }
);

const UserSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    avatar: { type: String, required: true },
    chats: [ChatSchema],
  },
  { timestamps: true }
);

export { UserSchema, ChatSchema, MessageSchema };

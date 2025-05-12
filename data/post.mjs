import Mongoose from "mongoose";
import * as UserRepository from "./auth.mjs";
import { useVirtualId } from "../db/database.mjs";

const postSchema = new Mongoose.Schema(
  {
    userid: { type: String, require: true },
    name: { type: String, require: true },
    url: String,
    text: { type: String, require: true },
    userId: { type: String, require: true },
  },
  { timestamps: true }
);

useVirtualId(postSchema);

const Post = Mongoose.model("Post", postSchema);

export async function getAll() {
  return Post.find().sort({ createAt: -1 });
}

export async function getAllByUserid(userid) {
  return Post.find({ userid }).sort({ createAt: -1 });
}

export async function getById(id) {
  return Post.findById(id);
}

export async function create(text, userId) {
  return UserRepository.findByid(userId).then((user) =>
    new Post({
      userid: user.userid,
      name: user.name,
      userId,
      text,
    }).save()
  );
}

// 포스트 변경
export async function update(id, text) {
  return Post.findByIdAndUpdate(id, { text }, { returnDocument: "after" });
}

// 포스트 삭제
export async function remove(id) {
  return Post.findOneAndDelete(id);
}

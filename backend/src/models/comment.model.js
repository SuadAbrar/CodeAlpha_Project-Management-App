import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: String,
    task: mongoose.Schema.Types.ObjectId,
    author: mongoose.Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Comment", commentSchema);

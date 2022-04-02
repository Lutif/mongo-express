import mongoose from "mongoose";
import { genHexString } from "../utils";

const todoSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toHexString(),
    },
    data: {
      type: String,
      default: () => genHexString(22)
    },
    hitsForTTL: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export const Todo = mongoose.model("Todo", todoSchema);

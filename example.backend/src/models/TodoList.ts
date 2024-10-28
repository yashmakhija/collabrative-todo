import mongoose, { Document, Schema } from "mongoose";

interface ITodoList extends Document {
  title: string;
  owner: mongoose.Types.ObjectId;
  tasks: mongoose.Types.ObjectId[];
  collaborators: mongoose.Types.ObjectId[];
}

const todoListSchema: Schema = new Schema({
  title: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model<ITodoList>("TodoList", todoListSchema);

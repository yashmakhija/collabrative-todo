import mongoose, { Document, Schema } from "mongoose";

interface ITask extends Document {
  title: string;
  completed: boolean;
  listId: mongoose.Types.ObjectId;
}

const taskSchema: Schema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  listId: { type: mongoose.Schema.Types.ObjectId, ref: "TodoList" },
});

export default mongoose.model<ITask>("Task", taskSchema);

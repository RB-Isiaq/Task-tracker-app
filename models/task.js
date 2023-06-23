import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    desc: {
      type: String,
      required: [true, "Description is required."],
    },
    dueDate: {
      type: String,
      required: [true, "A due date is required."],
    },
    status: {
      type: String,
      required: [true, "Status is required."],
    },
  },
  { timestamps: true }
);

const Task = models.Task || model("Task", TaskSchema);

export default Task;

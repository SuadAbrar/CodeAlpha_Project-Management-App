import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    status: String,
    list: String,
    project: mongoose.Schema.Types.ObjectId,
    assignee: mongoose.Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Task', taskSchema);

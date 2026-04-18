import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    owner: mongoose.Schema.Types.ObjectId,
    members: [mongoose.Schema.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Project', projectSchema);

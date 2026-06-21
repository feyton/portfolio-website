import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  thumbnail: string;
  featured: boolean;
  order: number;
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    tech: [{ type: String }],
    liveUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

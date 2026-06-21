import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPost extends Document {
  title: string;
  slug: string;
  content: string;
  summary: string;
  category: string;
  tags: string[];
  thumbnail: string;
  published: boolean;
  publishedAt: Date | null;
  visits: number;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, default: "" },
    summary: { type: String, default: "" },
    category: { type: String, default: "General" },
    tags: [{ type: String }],
    thumbnail: { type: String, default: "" },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date, default: null },
    visits: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// publishedAt is set in the API layer to avoid middleware type conflicts

export const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

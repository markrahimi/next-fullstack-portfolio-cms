import mongoose, { Model } from "mongoose";
import { IBlog, blogSchema } from "@/schemas/blog.schema";

const Blog = (mongoose.models.Blog as Model<IBlog>) || mongoose.model<IBlog>("Blog", blogSchema);

export type { IBlog };
export default Blog;

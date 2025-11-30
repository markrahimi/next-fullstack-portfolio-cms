import mongoose, { models } from "mongoose";
import { IAbout, aboutSchema } from "@/schemas/about.schema";

const About = models.About || mongoose.model<IAbout>("About", aboutSchema);

export type { IAbout };
export default About;

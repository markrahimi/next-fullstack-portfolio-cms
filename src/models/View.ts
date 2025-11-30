import mongoose, { models } from "mongoose";
import { IView, viewSchema } from "@/schemas/view.schema";

const View = models.View || mongoose.model<IView>("View", viewSchema);

export type { IView };
export default View;

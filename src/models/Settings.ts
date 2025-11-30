import mongoose, { Model } from "mongoose";
import { ISettings, settingsSchema } from "@/schemas/settings.schema";

const Settings = (mongoose.models.Settings as Model<ISettings>) || mongoose.model<ISettings>("Settings", settingsSchema);

export type { ISettings };
export default Settings;

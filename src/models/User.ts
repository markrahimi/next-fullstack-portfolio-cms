import mongoose from "mongoose";
import { IUser, UserModel, userSchema } from "@/schemas/user.schema";

const User = (mongoose.models.User as UserModel) || mongoose.model<IUser, UserModel>("User", userSchema);

export type { IUser };
export default User;

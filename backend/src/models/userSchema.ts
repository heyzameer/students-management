import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    hashPassword: string;
}

const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hashPassword: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
    }) as any;


const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
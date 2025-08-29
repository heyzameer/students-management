import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStudent extends Document {
    name: string;
    studentClass: string;
    phone: number;
}

const StudentSchema: Schema<IStudent> = new Schema({
    name: {
        type: String,
        required: true
    },

    stundentclass: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true,
        unique: true,
    }
}, { timestamps: true }) as any;

const Student: Model<IStudent> = mongoose.model<IStudent>("Student", StudentSchema);

export default Student;
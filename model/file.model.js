import mongoose from "mongoose";

const FileSchema = mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    fileURL: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

// Create a model for the File schema
const File = mongoose.model('File', FileSchema);

export default File;
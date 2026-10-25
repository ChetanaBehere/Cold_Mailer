import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    domain: {
        type: String,
        trim: true
    },
    skills: [{
        type: String,
        required: true,
        trim: true
    }],
    files: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        required: true
    }],
    mails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mail",
        required: true
    }],
    extractions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Extraction",
        required: true
    }]
},
{timestamps: true}
)    


const User = mongoose.model('User', userSchema);

export default User;
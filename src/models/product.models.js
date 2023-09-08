import { Schema, model } from "mongoose";

const prodSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    stock : {
        type: String,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    status : {
        type: Boolean,
        default: true
    },
    code : {
        type: String,
        requerid: true,
        unique: true
    },
    thumbnails: []
})

export const prodModel = model('products' , prodSchema)
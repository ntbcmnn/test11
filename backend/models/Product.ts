import mongoose, {HydratedDocument, Schema} from 'mongoose';
import {IProduct} from '../types';

const ProductSchema = new mongoose.Schema<HydratedDocument<IProduct>>({
    seller: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Seller is required."],
    },
    category: {
        type: Schema.Types.ObjectId,
        required: [true, "Category is required."],
        ref: "Category",
    },
    title: {
        type: String,
        validate:
            {
                validator: async function (value: string): Promise<boolean> {
                    return value.trim().length > 0;
                },
                message: "Title is required.",
            },
    },
    description: {
        type: String,
        validate: {
            validator: async function (value: string): Promise<boolean> {
                return value.trim().length > 0;
            },
            message: "Description is required.",
        },
    },
    price: {
        type: Number,
        validate: {
            validator: function (value: number): boolean {
                return value > 0 && value >= 100;
            },
            message: "Price must be greater than 100 and a positive number.",
        },
    },
    image: {
        type: String,
        validate: {
            validator: async function (value: string): Promise<boolean> {
                return !!value;
            },
            message: "Image is required.",
        },
    },
});
const Product = mongoose.model('Product', ProductSchema);

export default Product;
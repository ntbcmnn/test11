import mongoose, {HydratedDocument} from 'mongoose';
import {ICategory} from '../types';

const CategorySchema = new mongoose.Schema<HydratedDocument<ICategory>>({
    name: {
        type: String,
        required: [true, "Category name is required."],
    },
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;
import express from 'express';
import Product from '../models/Product';
import {imagesUpload} from '../multer';
import User from '../models/User';
import mongoose, {Error} from 'mongoose';

const productsRouter = express.Router();

productsRouter.post('/', imagesUpload.single('image'), async (req: express.Request, res: express.Response, next) => {
    const token = req.get('Authorization');
    const {category, title, description, price} = req.body;

    if (!token) {
        res.status(401).send({error: 'Token is missing.'});
        return;
    }

    const user = await User.findOne({token});

    if (!user) {
        res.status(401).send({error: 'No users matching this token.'});
        return;
    }

    try {
        const product = new Product({
            user: user._id,
            category,
            title: title.trim(),
            description: description.trim(),
            price: Number(price),
            image: req.file ? 'images' + req.file.filename : null,
        });

        await product.save();
        res.send(product);

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

productsRouter.get('/', async (req: express.Request, res: express.Response, next) => {
    try {
        const products = await Product
            .find()
            .populate("category", "-_id -__v")
            .populate("user", "-_id -token -password -__v -username");
        res.send(products);
    } catch (e) {
        next(e);
    }
});

productsRouter.get('/:id', async (req: express.Request, res: express.Response, next) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).send('Invalid product ID.');
        return;
    }

    try {
        const product = await Product
            .findById(id)
            .populate("category", "-_id -__v")
            .populate("user", "-_id -token -password -__v");

        if (!product) {
            res.status(404).send('Product not found.');
            return;
        }

        res.send(product);
    } catch (e) {
        next(e);
    }
});

productsRouter.get('/category/:id', async (req: express.Request, res: express.Response, next) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).send({error: 'Invalid category ID.'});
        return;
    }

    try {
        const products = await Product
            .find({category: id})
            .populate("category", "-_id -__v")
            .populate("user", "-_id -token -password -__v");

        if (products.length === 0) {
            res.status(404).send({error: 'No products found for this category.'});
            return;
        }

        res.send(products);
    } catch (e) {
        next(e);
    }
});

productsRouter.delete('/:id', async (req: express.Request, res: express.Response, next) => {
    const {id} = req.params;
    const token = req.get('Authorization');

    if (!token) {
        res.status(401).send({error: 'Token is missing.'});
        return;
    }

    const user = await User.findOne({token});

    if (!user) {
        res.status(401).send({error: 'No users matching this token.'});
        return;
    }

    try {
        const product = await Product.findById(id);

        if (!product) {
            res.status(404).send({error: 'Product not found.'});
            return;
        }

        if (product.user.toString() !== user._id.toString()) {
            res.status(403).send({error: 'You are not allowed to delete this product.'});
            return;
        }

        await Product.findByIdAndDelete(id);

        res.send({message: 'Product deleted successfully.'});
    } catch (e) {
        next(e);
    }
});

export default productsRouter;
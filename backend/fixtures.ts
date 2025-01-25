import config from './config';
import mongoose from 'mongoose';
import User from './models/User';
import {randomUUID} from 'node:crypto';
import Category from './models/Category';
import Product from './models/Product';

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('categories');
        await db.dropCollection('products');
    } catch (e) {
        console.log('Collections were not present, skipping the drop ');
    }

    const [liam, zayn] = await User.create(
        {
            username: 'liam',
            password: '123',
            display_name: 'Liam Payne',
            phone_number: '0555888080',
            token: randomUUID(),
        },
        {
            username: 'zayn',
            password: '123',
            display_name: 'Zayn Malik',
            phone_number: '0555999090',
            token: randomUUID(),
        },
    );

    const [hoodies, sneakers, jeans, t_shirts] = await Category.create(
        {
            name: 'Hoodies',
        },
        {
            name: 'Sneakers',
        },
        {
            name: 'Jeans',
        },
        {
            name: 'T-Shirts',
        },
    );

    await Product.create(
        {
            seller: liam._id,
            category: hoodies._id,
            title: 'White basic hoodie',
            description: `Hoodie with "All we need is money" writing`,
            price: 1500,
            image: "fixtures/white_hoodie.jpg"
        },
        {
            seller: liam._id,
            category: hoodies._id,
            title: 'Blue basic hoodie',
            description: `Basic hoodie with "Brooklyn" writing`,
            price: 2500,
            image: "fixtures/blue_hoodie.jpg"
        },
        {
            seller: liam._id,
            category: sneakers._id,
            title: 'Retro sneakers',
            description: `Brown classical retro sneakers - Nike air jordan retro high`,
            price: 7500,
            image: "fixtures/brown_sneakers.jpg"
        },
        {
            seller: liam._id,
            category: sneakers._id,
            title: 'Red high sneakers',
            description: `Red colored classical retro sneakers - Nike air jordan retro high`,
            price: 8500,
            image: "fixtures/red_sneakers.jpg"
        },
        {
            seller: zayn._id,
            category: jeans._id,
            title: 'Lightblue jeans',
            description: `Comfortable wide Y2K jeans`,
            price: 2800,
            image: "fixtures/light_jeans.jpg"
        },
        {
            seller: zayn._id,
            category: jeans._id,
            title: 'Darkblue jeans',
            description: `Comfortable wide Y2K jeans (darker color)`,
            price: 3000,
            image: "fixtures/dark_jeans.jpg"
        },
        {
            seller: zayn._id,
            category: t_shirts._id,
            title: 'Basic beige t-shirt',
            description: `T-Shirt with Japan-styled painting`,
            price: 1200,
            image: "fixtures/light_t_shirt.jpg"
        },
        {
            seller: zayn._id,
            category: t_shirts._id,
            title: 'Blue t-shirt',
            description: `T-Shirt with fingerprint painting`,
            price: 2100,
            image: "fixtures/blue_t_shirt.jpg"
        },
    );

    await db.close();
};

run().catch(console.error);
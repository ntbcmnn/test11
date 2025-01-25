import {Types} from 'mongoose';

export interface UserFields {
    username: string;
    password: string;
    token: string;
    display_name: string;
    phone_number: string;
}

export interface IProduct {
    user: Types.ObjectId;
    category: Types.ObjectId;
    title: string;
    description: string;
    price: number;
    image: string | null;
}

export interface ICategory {
    name: string;
}
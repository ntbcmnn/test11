export interface IUser {
  _id: string;
  username: string;
  token: string;
  display_name: string;
  phone_number: string;
}

export interface RegisterResponse {
  user: IUser;
  message: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  display_name: string;
  phone_number: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface IProduct {
  _id: string;
  user: {
    username: string;
    display_name: string;
    phone_number: string;
  };
  category: {
    name: string;
  };
  title: string;
  description: string;
  price: number;
  image: File | null;
}

export interface ICategory {
  _id: string;
  name: string;
}

export interface IProductMutation {
  category: ICategory;
  title: string;
  description: string;
  price: string;
  image: File | null;
}


import React from 'react';
import { IProduct } from '../../types';
import { api_URL } from '../../globalConstants.ts';
import { NavLink } from 'react-router-dom';

interface Props {
  product: IProduct;
}

const Product: React.FC<Props> = ({product}) => {
  return (
    <div className="card w-25">
      <div className="card-body d-flex justify-content-start gap-4 align-items-center">
        <div className="w-100">
          <img src={`${api_URL}/${product.image}`} className="w-100 h-auto rounded-3" alt={product.title}/>
        </div>
        <div className="w-100">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text fw-bold">{product.price} KGS</p>
        </div>
      </div>
      <NavLink to={`/products/${product._id}`} className="btn btn-dark mb-3 mx-3">View detailed info</NavLink>
    </div>
  );
};

export default Product;
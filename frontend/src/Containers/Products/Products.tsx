import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectFetchingLoading, selectProducts } from '../../store/slices/productsSlice.ts';
import Product from '../../Components/Product/Product.tsx';
import { useEffect } from 'react';
import { getProducts } from '../../store/thunks/productsThunk.ts';
import Loader from '../../Components/UI/Loader/Loader.tsx';

const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectFetchingLoading);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return <>
    {
      isLoading ?
        <Loader/> :
        <div className="container my-5 d-flex flex-wrap gap-4 justify-content-center">
          {products.map((product) => (
            <Product key={product._id} product={product}/>
          ))}
        </div>
    }
  </>;
};

export default Products;
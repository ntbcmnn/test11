import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectFetchingLoading, selectProducts } from '../../store/slices/productsSlice.ts';
import Product from '../../Components/Product/Product.tsx';
import { useEffect } from 'react';
import { getProducts, getProductsByCategory } from '../../store/thunks/productsThunk.ts';
import Loader from '../../Components/UI/Loader/Loader.tsx';
import { useParams } from 'react-router-dom';

const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectFetchingLoading);
  const {categoryId} = useParams();

  useEffect(() => {
    if (categoryId) {
      dispatch(getProductsByCategory(categoryId));
    } else {
      dispatch(getProducts());
    }
  }, [dispatch, categoryId]);

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
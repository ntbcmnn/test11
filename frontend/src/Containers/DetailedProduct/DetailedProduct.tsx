import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectDeletingLoading, selectFetchingLoading, selectProduct } from '../../store/slices/productsSlice.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { deleteProduct, getProductById } from '../../store/thunks/productsThunk.ts';
import { api_URL } from '../../globalConstants.ts';
import { selectUser } from '../../store/slices/usersSlice.ts';
import { toast } from 'react-toastify';
import Loader from '../../Components/UI/Loader/Loader.tsx';
import ButtonLoading from '../../Components/UI/ButtonLoading/ButtonLoading.tsx';

const DetailedProduct = () => {
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProduct);
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectFetchingLoading);
  const isDeleting = useAppSelector(selectDeletingLoading);
  const navigate = useNavigate();
  const {productId} = useParams();

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId));
    }
  }, [dispatch, productId]);

  const deleteItem = async (productId: string) => {
    if (confirm('Sure you want to delete this product?')) {
      await dispatch(deleteProduct(productId));
      navigate('/');
    } else {
      toast.info('You cancelled product deletion');
    }
  };

  return product && (
    <>
      {isLoading ? <Loader/> :
        <div className="card" style={{maxWidth: '500px'}}>
          <div className="card-header bg-danger text-center">
            <p className="text-white fs-6 m-0 p-0 d-inline-flex align-items-center gap-1"><i
              className="bi bi-tags"></i>{product.category.name.toLowerCase()}</p>
          </div>


          <div className="card-body d-flex justify-content-start gap-4 align-items-center">
            <div className="w-100">
              <img src={`${api_URL}/${product.image}`} className="card-img w-100 h-auto rounded-3" alt={product.title}/>
            </div>
            <div className="w-100">
              <h3 className="card-title">{product.title}</h3>
              <p className="card-text">{product.description}</p>
              <p className="card-text fw-bold text-danger">{product.price} KGS</p>
              <h5 className="fw-bolder">Seller: {product.user.display_name}</h5>
              <p className="m-0 p-0">{product.user.phone_number}</p>
            </div>

          </div>

          {user && user.username === product.user.username ?
            <div className="m-3 text-center">
              <ButtonLoading isLoading={isDeleting} isDisabled={isDeleting} text="Delete"
                             onClick={() => deleteItem(product._id)}/>
            </div>
            : null
          }
        </div>
      }
    </>
  );
};

export default DetailedProduct;
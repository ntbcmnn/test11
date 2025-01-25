import React, { useEffect, useState } from 'react';
import { IProductMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectCategories } from '../../store/slices/categoriesSlice.ts';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../store/slices/usersSlice.ts';
import { addProduct } from '../../store/thunks/productsThunk.ts';
import { selectCreatingError, selectCreatingLoading } from '../../store/slices/productsSlice.ts';
import ButtonLoading from '../../Components/UI/ButtonLoading/ButtonLoading.tsx';
import FileInput from '../../Components/UI/FileInput/FileInput.tsx';
import { getCategories } from '../../store/thunks/categoriesThunk.ts';

const initialState = {
  category: {
    _id: '',
    name: '',
  },
  title: '',
  description: '',
  price: '',
  image: null,
};

const AddProduct = () => {
  const [form, setForm] = useState<IProductMutation>({...initialState});
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const user = useAppSelector(selectUser);
  const creatingError = useAppSelector(selectCreatingError);
  const isCreating = useAppSelector(selectCreatingLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/register');
    dispatch(getCategories());
  }, [navigate, user, dispatch]);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(addProduct({productMutation: form})).unwrap();
      setForm({...initialState});
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const {name, value} = e.target;
    setForm((prevState: IProductMutation) => ({...prevState, [name]: value}));
  };

  const onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const {name, files} = e.target;

    if (files) {
      setForm((prevState: IProductMutation) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return creatingError?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <>
      <div
        style={{maxWidth: '500px'}}
        className="container mt-5 bg-white p-4 shadow rounded"
      >
        <h3 className="text-center mb-5 mt-2">Create new product</h3>

        <form onSubmit={onFormSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="title"
              id="title"
              value={form.title}
              onChange={onInputChange}
              className={`form-control ${getFieldError('title') ? 'is-invalid' : ''}`}
            />
            <label htmlFor="title">Title</label>
            {getFieldError('title') && (
              <div className="invalid-feedback">{getFieldError('title')}</div>
            )}
          </div>

          <div className="mb-3">
            <textarea
              name="description"
              id="description"
              value={form.description}
              onChange={onInputChange}
              className={`form-control ${getFieldError('description') ? 'is-invalid' : ''}`}
            />
            <label htmlFor="description">Description</label>
            {getFieldError('description') && (
              <div className="invalid-feedback">
                {getFieldError('description')}
              </div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="number"
              name="price"
              id="price"
              value={form.price}
              onChange={onInputChange}
              className={`form-control ${getFieldError('price') ? 'is-invalid' : ''}`}
            />
            <label htmlFor="price">Price</label>
            {getFieldError('price') && (
              <div className="invalid-feedback">{getFieldError('price')}</div>
            )}
          </div>

          <div className="mb-3">
            <select
              name="category"
              value={form.category._id}
              onChange={onInputChange}
              className={`form-select ${getFieldError('category') ? 'is-invalid' : ''}`}
            >
              <option value="" disabled className="bg-gray-25">
                Select product category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <label htmlFor="category">Category</label>
            {getFieldError('category') && (
              <div className="invalid-feedback">{getFieldError('category')}</div>
            )}
          </div>


          <div className="mb-3">
            <FileInput
              id="image"
              name="image"
              label="Image"
              onGetFile={onFileChange}
              file={form.image}
              className={`form-control ${getFieldError('image') ? 'is-invalid' : ''}`}
            />

            {getFieldError('image') && (
              <div className="invalid-feedback">{getFieldError('image')}</div>
            )}
          </div>

          <div className="d-flex gap-3 justify-content-center mb-3">
            <ButtonLoading
              isLoading={isCreating}
              isDisabled={isCreating}
              text="Create"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
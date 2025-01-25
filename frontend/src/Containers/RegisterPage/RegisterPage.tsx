import React, { useState } from 'react';
import { RegisterMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectRegisterError, selectRegisterLoading } from '../../store/slices/usersSlice.ts';
import { NavLink, useNavigate } from 'react-router-dom';
import { register } from '../../store/thunks/usersThunk.ts';
import ButtonLoading from '../../Components/UI/ButtonLoading/ButtonLoading.tsx';

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const registerError = useAppSelector(selectRegisterError);
  const isLoading = useAppSelector(selectRegisterLoading);
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterMutation>({
    username: '',
    password: '',
    display_name: '',
    phone_number: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm((prevState) => ({...prevState, [name]: value}));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(register(form)).unwrap();
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return registerError?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <div className="container mt-5" style={{maxWidth: '400px'}}>
      <div className="text-center mb-4">
        <i className="bi bi-lock fs-2 "></i>
        <h2 className="mt-2">Sign Up</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={onChange}
            className={`form-control ${getFieldError('username') ? 'is-invalid' : ''}`}
          />
          {getFieldError('username') && (
            <div className="invalid-feedback">{getFieldError('username')}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={onChange}
            className={`form-control ${getFieldError('password') ? 'is-invalid' : ''}`}
          />
          {getFieldError('password') && (
            <div className="invalid-feedback">{getFieldError('password')}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="display_name" className="form-label">
            Seller's name
          </label>
          <input
            type="text"
            id="display_name"
            name="display_name"
            value={form.display_name}
            onChange={onChange}
            className={`form-control ${getFieldError('display_name') ? 'is-invalid' : ''}`}
          />
          {getFieldError('display_name') && (
            <div className="invalid-feedback">{getFieldError('display_name')}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="phone_number" className="form-label">
            Phone number
          </label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={form.phone_number}
            onChange={onChange}
            className={`form-control ${getFieldError('phone_number') ? 'is-invalid' : ''}`}
          />
          {getFieldError('phone_number') && (
            <div className="invalid-feedback">{getFieldError('phone_number')}</div>
          )}
        </div>

        <div className="mb-3">
          <ButtonLoading
            type="submit"
            text="Sign up"
            isLoading={isLoading}
            isDisabled={isLoading}
          />
        </div>

        <div className="text-center mt-3">
          <NavLink to="/login" className="text-decoration-none">
            Already have an account? Sign in
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;

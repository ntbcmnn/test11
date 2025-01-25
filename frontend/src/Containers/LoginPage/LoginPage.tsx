import React, { useState } from 'react';
import { LoginMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectLoginError, selectLoginLoading } from '../../store/slices/usersSlice.ts';
import { NavLink, useNavigate } from 'react-router-dom';
import { login } from '../../store/thunks/usersThunk.ts';
import ButtonLoading from '../../Components/UI/ButtonLoading/ButtonLoading.tsx';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const loginError = useAppSelector(selectLoginError);
  const isLoading = useAppSelector(selectLoginLoading);
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginMutation>({
    username: '',
    password: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm((prevState) => ({...prevState, [name]: value}));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(login(form)).unwrap();
    navigate('/');
  };

  return (
    <div className="container mt-5" style={{maxWidth: '400px'}}>
      <div className="text-center mb-4">
        <i className="bi bi-unlock fs-2 "></i>
        <h2 className="mt-2">Sign In</h2>
      </div>

      {loginError && (
        <div className="alert alert-danger" role="alert">
          {loginError.error}
        </div>
      )}

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
            className="form-control"
          />
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
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <ButtonLoading
            type="submit"
            text="Sign in"
            isLoading={isLoading}
            isDisabled={isLoading}
          />
        </div>

        <div className="text-center mt-3">
          <NavLink to="/register" className="text-decoration-none">
            Don't have an account yet? Sign up
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

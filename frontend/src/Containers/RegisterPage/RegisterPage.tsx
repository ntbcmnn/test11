import React, { useState } from "react";
import { RegisterMutation } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectRegisterError } from "../../store/slices/usersSlice.ts";
import { NavLink, useNavigate } from "react-router-dom";
import { register } from "../../store/thunks/usersThunk.ts";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const registerError = useAppSelector(selectRegisterError);
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterMutation>({
    username: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(register(form)).unwrap();
      navigate("/");
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
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
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
            className={`form-control ${getFieldError("username") ? "is-invalid" : ""}`}
          />
          {getFieldError("username") && (
            <div className="invalid-feedback">{getFieldError("username")}</div>
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
            className={`form-control ${getFieldError("password") ? "is-invalid" : ""}`}
          />
          {getFieldError("password") && (
            <div className="invalid-feedback">{getFieldError("password")}</div>
          )}
        </div>

        <button type="submit" className="btn btn-dark w-100">
          Sign Up
        </button>

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

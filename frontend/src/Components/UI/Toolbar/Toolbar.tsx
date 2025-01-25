import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../../store/slices/usersSlice.ts';
import UserMenu from './UserMenu.tsx';
import AnonymousMenu from './AnonymousMenu.tsx';
import { selectCategories } from '../../../store/slices/categoriesSlice.ts';
import { useEffect } from 'react';
import { getCategories } from '../../../store/thunks/categoriesThunk.ts';

const Toolbar = () => {
  const user = useAppSelector(selectUser);
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container d-flex align-items-center justify-content-between">
        <NavLink
          className="navbar-brand text-white d-inline-flex align-items-center gap-2"
          to="/"
        >
          Marketplace
        </NavLink>

        <div className="d-flex align-items-center justify-content-between gap-3">
          {categories.map((category) => (
            <NavLink key={category._id} to={`products/category/${category._id}`}
                     className="text-decoration-none menu-item text-white">{category.name}</NavLink>
          ))}
        </div>

        <div className="d-flex justify-content-end gap-3">
          {user ? <UserMenu user={user}/> : <AnonymousMenu/>}
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;

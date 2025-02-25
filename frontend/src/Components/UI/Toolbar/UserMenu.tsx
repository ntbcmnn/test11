import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IUser } from '../../../types';
import { useAppDispatch } from '../../../app/hooks.ts';
import { logout } from '../../../store/thunks/usersThunk.ts';
import { unsetUser } from '../../../store/slices/usersSlice.ts';

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    dispatch(logout());
    dispatch(unsetUser());
    navigate('/');
  };

  return (
    <div className="d-flex align-items-center gap-4">
      <div className="dropdown">
        <button
          className="btn btn-outline-light border-0 dropdown-toggle d-inline-flex gap-2 align-items-center"
          type="button"
          onClick={toggleMenu}
        >
          <i className="bi bi-person-circle"></i>
          {user.display_name}
        </button>
        <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
          <button className="dropdown-item btn btn-dark" onClick={handleLogOut}>
            Log out
          </button>
          <NavLink to="/add-product" className="dropdown-item text-decoration-none btn btn-dark">Add product</NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;

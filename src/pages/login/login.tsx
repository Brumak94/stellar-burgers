import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';
import { loginUser, getUser } from '../../services/slices/userSlice';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(getUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const from = location.state?.from || '/';

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  if (user) {
    return <Navigate to={from} replace />;
  }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

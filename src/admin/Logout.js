import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    navigate('/');
  }, [navigate, setAuthenticated]);

  return (
    <div>
      <h1>Выход</h1>
      <p>Вы успешно вышли из системы.</p>
    </div>
  );
};

export default Logout;

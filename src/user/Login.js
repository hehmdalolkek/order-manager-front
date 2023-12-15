import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_APIURL}/login`, loginData);

      if (response.status === 200) {
        const token = response.data;
        localStorage.setItem('token', token);
        setAuthenticated(true);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className='container mt-5 text-center'>
      <div className='col-5 mx-auto p-5 border rounded'>
        <h2 className='mb-5'>Авторизация</h2>
        <div
          className='py-3 mb-4'
          style={{
            borderLeft: "4.5px solid rgb(95 95 95)",
            backgroundColor: "rgb(196 196 196 / 19%)"
          }}
        >
          <p className='mb-1'>
            Логин: admin
          </p>
          <p className='mb-1'>
            Пароль: admin
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          {
            error &&
            <div className='alert alert-danger' role='alert'>
              Ошибка авторизации. Проверьте введённые данные.
            </div>
          }
          <div className='form-floating mb-3'>
            <input
              className="form-control"
              type="text"
              placeholder="Имя пользователя"
              value={username}
              id='username'
              onChange={handleUsernameChange}
            />
            <label htmlFor="username">Логин</label>
          </div>
          <div className='form-floating mb-3'>
            <input
              className="form-control"
              type="password"
              placeholder="Пароль"
              value={password}
              id="password"
              onChange={handlePasswordChange}
            />
            <label htmlFor="password">Пароль</label>
          </div>
          <Link className='btn btn-outline-danger me-2 px-3' to='/'>Отменить</Link>
          <button className='btn btn-outline-dark px-5' type="submit">Войти</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

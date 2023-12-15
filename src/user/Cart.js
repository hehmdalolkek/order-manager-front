import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Cart = ({ items, total, clearCart, updateCart, removeFromCart }) => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const createOrder = async (orderData) => {
    try {
      axios.post(`${process.env.REACT_APP_APIURL}/orders`, orderData);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > 0) {
      updateCart(item, newQuantity);
    }
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item);
  };

  const handleCreateOrder = (data) => {
    const orderData = {
      order: {
        total: total,
        user: {
          fio: data.fio,
          email: data.email
        }
      },
      orderDetails: items.map((item) => ({
        product: { id: item.id },
        count: item.quantity
      }))
    };

    createOrder(orderData);
    clearCart();
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
    localStorage.setItem('total', total);
  }, [items, total]);

  return (
    <div className='container col-8 text-center py-5 px-3 my-5 shadow border rounded' style={{ position: "relative" }}>
      <h2 className='mb-5'>Корзина</h2>
      {
        items.length !== 0 ? (
          <button
            type='button'
            className='btn btn-outline-dark'
            onClick={handleClearCart}
            style={{ position: "absolute", top: "48px", right: "52px" }}
          >
            Очистить корзину
          </button>
        ) : null
      }
      {items.length === 0 ? (
        <div>
          <h5>Корзина пуста</h5>
          <Link className='btn btn-outline-danger mt-5 px-4' to='/'>Назад</Link>
        </div>
      ) : (
        <div>
          <table className="table align-middle">
            <thead>
              <tr>
                <th scope="col">Фото</th>
                <th scope="col">Название</th>
                <th scope="col">Количество</th>
                <th scope="col">Стоимость</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                items.map((item) => (
                  <tr key={item.id}>
                    <td><img style={{ height: "100px" }} src={item.photo} /></td>
                    <th scope="row">{item.title}</th>
                    <td>
                      <input
                        className='form-control mx-auto'
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                        min="1"
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{item.price * item.quantity} руб.</td>
                    <td><button className='btn btn-outline-danger' onClick={() => handleRemoveItem(item)}>Удалить</button></td>
                  </tr>
                ))
              }
              <tr>
                <td></td>
                <td></td>
                <th>Итого:</th>
                <td>{total.toLocaleString('ru-RU') + '.00'} руб.</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <form className='col-6 px-5 pt-5 pb-2 mx-auto' onSubmit={handleSubmit(handleCreateOrder)}>
            <h2 className='mb-5'>Оформление заказа</h2>
            <div className="mb-3 form-floating">
              <input
                type="text"
                className={`form-control ${errors.fio ? "is-invalid" : ""}`}
                id="fioInput"
                placeholder="Иванов Иван"
                {...register('fio', { required: true })}
              />
              <label htmlFor="fioInput">ФИО</label>
              {errors.fio && <span className="invalid-feedback">Поле ФИО обязательно для заполнения</span>}
            </div>
            <div className="mb-5 form-floating">
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="emailInput"
                placeholder="name@example.com"
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              />
              <label htmlFor="emailInput">Email</label>
              {errors.email && errors.email.type === 'required' && <span className="invalid-feedback">Поле Email обязательно для заполнения</span>}
              {errors.email && errors.email.type === 'pattern' && <span className="invalid-feedback">Некорректный формат Email</span>}
            </div>
            <Link className='btn btn-outline-danger me-2 px-4' to='/'>Назад</Link>
            <button type='submit' className='btn btn-outline-dark'>Создать заказ</button>
          </form>
        </div>
      )
      }
    </div >
  );
};

export default Cart;
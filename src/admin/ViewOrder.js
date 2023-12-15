import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ViewOrder() {

  const [orderWrapper, setOrderWrapper] = useState({
    order: {
      id: "",
      user: {
        id: "",
        fio: "",
        email: ""
      },
      createDate: "",
      total: ""
    },
    orderDetails: []
  });
  const { id } = useParams();


  const loadOrder = async () => {
    const result = await axios.get(`${process.env.REACT_APP_APIURL}/orders/${id}`);
    setOrderWrapper(result.data);
  }

  useEffect(() => {
    loadOrder();
  }, [id]);


  return (
    <div className='container p-5 my-5 border shadow rounded text-center'>
      <h2 className='mb-5'>Заказ {orderWrapper.order.id}</h2>
      <div className='col-6 mx-auto mb-5'>
        <h5>Данные покупаетеля:</h5>
        <p className='mb-1'>ФИО: {orderWrapper.order.user.fio}</p>
        <p>Email: {orderWrapper.order.user.email}</p>
        <h5>Данные заказа:</h5>
        <p className='mb-1'>Дата заказа: {orderWrapper.order.createDate}</p>
        <p>Итоговая сумма: {orderWrapper.order.total.toLocaleString('ru-RU') + '.00'} руб.</p>
      </div>
      <div className='mb-5'>
        <h4 className='mb-4'>Товары:</h4>
        <table className="table align-middle">
          <thead>
            <tr>
              <th scope="col">Фото</th>
              <th scope="col">Название</th>
              <th scope="col">Количество</th>
              <th scope="col">Стоимость</th>
            </tr>
          </thead>
          <tbody>
            {
              orderWrapper.orderDetails.map((orderDetail, index) => (
                <tr key={index}>
                  <td><img style={{ height: "100px" }} src={orderDetail.product.photo} /></td>
                  <th scope="row">{orderDetail.product.title}</th>
                  <td>{orderDetail.count}</td>
                  <td>{orderDetail.product.price * orderDetail.count} руб.</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <Link className='btn btn-outline-dark px-4' to='/dashboard'>Назад</Link>
    </div>
  )
}

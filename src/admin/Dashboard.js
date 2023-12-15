import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';




export default function Dashboard() {

  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const result = await axios.get(`${process.env.REACT_APP_APIURL}/orders`);
    const sortedData = result.data.sort((a, b) => b.id - a.id);
    setOrders(sortedData);
  };

  const deleteOrder = async (id) => {
    axios.delete(`${process.env.REACT_APP_APIURL}/orders/${id}`);
  };

  useEffect(() => {
    loadOrders();
  }, [orders]);


  return (
    <div className='container shadow border rounded my-5 py-5'>
      <h2 className='text-center mb-5'>Текущие заказы</h2>
      <div className='col-7 mx-auto'>
        {
          orders.map((order) => (
            <div className='shadow border d-flex mb-3 justify-content-between align-items-center' key={order.id}>
              <Link className='flex-fill d-block py-4 ps-4 text-dark link-underline link-underline-opacity-0' to={`/order/${order.id}`}>
                <span className='pe-5'>ID: {order.id}</span>
                <span className='ps-5'>Дата заказа: {order.createDate}</span>
              </Link>
              <div className='pe-4'>
                <Link className='btn btn-outline-dark me-2' to={`/editorder/${order.id}`}>Изменить</Link>
                <button className='btn btn-outline-danger' onClick={() => deleteOrder(order.id)}>Удалить</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

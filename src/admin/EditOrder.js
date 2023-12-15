import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function EditOrder() {
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
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const loadOrder = async () => {
    const result = await axios.get(`${process.env.REACT_APP_APIURL}/orders/${id}`);
    setOrderWrapper(result.data);

    setValue('fio', result.data.order.user.fio);
    setValue('email', result.data.order.user.email);
  }


  const handleProductCountChange = (index, count) => {
    const updatedOrderDetails = [...orderWrapper.orderDetails];
    updatedOrderDetails[index].count = count;
    setOrderWrapper(prevState => ({
      ...prevState,
      orderDetails: updatedOrderDetails,
      order: {
        ...prevState.order,
        total: calculateTotal(updatedOrderDetails)
      }
    }));
  };

  const handleRemoveProduct = (index) => {
    const updatedOrderDetails = [...orderWrapper.orderDetails];
    updatedOrderDetails.splice(index, 1);
    setOrderWrapper(prevState => ({
      ...prevState,
      orderDetails: updatedOrderDetails,
      order: {
        ...prevState.order,
        total: calculateTotal(updatedOrderDetails)
      }
    }));
  };

  const handleUserFIOChange = (e) => {
    const fio = e.target.value;
    setOrderWrapper(prevState => ({
      ...prevState,
      order: {
        ...prevState.order,
        user: {
          ...prevState.order.user,
          fio: fio
        }
      }
    }));
  };

  const handleUserEmailChange = (e) => {
    const email = e.target.value;
    setOrderWrapper(prevState => ({
      ...prevState,
      order: {
        ...prevState.order,
        user: {
          ...prevState.order.user,
          email: email
        }
      }
    }));
  };

  const calculateTotal = (orderDetails) => {
    let total = 0;
    orderDetails.forEach(orderDetail => {
      total += orderDetail.product.price * orderDetail.count;
    });
    return total;
  };

  const onSubmit = async (data) => {
    try {
      const updatedOrderWrapper = {
        ...orderWrapper,
        order: {
          ...orderWrapper.order,
          user: {
            ...orderWrapper.order.user,
            fio: data.fio,
            email: data.email
          }
        }
      };
      await axios.put(`${process.env.REACT_APP_APIURL}/orders/${id}`, updatedOrderWrapper);
      console.log(updatedOrderWrapper);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  
  useEffect(() => {
    loadOrder();
  }, [id]);

  return (
    <div className='container p-5 my-5 border shadow rounded text-center'>
      <h2 className='mb-5'>Заказ {orderWrapper.order.id}</h2>
      <div className='col-6 mx-auto mb-5'>
        <h5>Данные покупателя:</h5>
        <div className='form-floating mx-auto' style={{maxWidth: "350px"}}>
          <input
            type="text"
            id="fio"
            {...register("fio", { required: true })}
            onChange={handleUserFIOChange}
            className={`form-control mb-2 ${errors.fio ? "is-invalid" : ""}`}
            defaultValue={orderWrapper.order.user.fio}
            placeholder='fio'
          />
          <label htmlFor='fio'>ФИО</label>
          {errors.fio && <div className="invalid-feedback">ФИО обязательно для заполнения</div>}
        </div>
        <div className='form-floating mx-auto' style={{maxWidth: "350px"}}>
          <input
            type="email"
            id="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            onChange={handleUserEmailChange}
            className={`form-control mb-2 ${errors.email ? "is-invalid" : ""}`}
            defaultValue={orderWrapper.order.user.email}
            placeholder='email'
          />
          <label htmlFor='email'>Email</label>
          {errors.email && <div className="invalid-feedback">Введите корректный email</div>}
        </div>
        <h5 className='mt-4'>Данные заказа:</h5>
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
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {
              orderWrapper.orderDetails.map((orderDetail, index) => (
                <tr key={index}>
                  <td><img style={{ height: "100px" }} src={orderDetail.product.photo} alt={orderDetail.product.title} /></td>
                  <th scope="row">{orderDetail.product.title}</th>
                  <td>
                    <input
                      type="number"
                      min="1"
                      {...register(`count[${index}]`, { required: true, min: 1 })}
                      value={orderDetail.count}
                      onChange={(e) => handleProductCountChange(index, parseInt(e.target.value))}
                      style={{width: "100px"}}
                      className={`form-control mx-auto ${errors.count && errors.count[index] ? "is-invalid" : ""}`}
                    />
                    {errors.count && errors.count[index] && <div className="invalid-feedback">Введите количество товара</div>}
                  </td>
                  <td>{orderDetail.product.price * orderDetail.count} руб.</td>
                  <td>
                    <button className="btn btn-outline-danger" onClick={() => handleRemoveProduct(index)}>Удалить</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <button className='btn btn-outline-dark px-4' onClick={handleSubmit(onSubmit)}>Сохранить</button>
      <Link className='btn btn-outline-danger px-4 ms-2' to='/dashboard'>Отменить</Link>
    </div>
  )
}

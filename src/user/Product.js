import React, { useState } from 'react';

const Product = ({ product, onAddToCart }) => {

  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 1000);
  };

  return (
      <div
        className='shadow border rounded py-4 px-3 mb-5 text-center'
        style={{ width: "310px", display: "flex", flexDirection: "column" }}
      >
        <h4>{product.title}</h4>
        <img className='d-block mx-auto' src={product.photo} style={{ height: "150px" }} />
        <p style={{ height: "101px", overflow: "hidden" }}>{product.description}</p>
        <h5 className='mt-auto'>Цена: {product.price} руб.</h5>
        <button
          className='btn btn-outline-dark'
          onClick={handleAddToCart}
        >
          {addedToCart ? 'Добавлено в корзину' : 'Добавить в корзину'}
        </button>
      </div>
  );
};

export default Product;
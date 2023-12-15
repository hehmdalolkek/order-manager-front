import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from './Product';

const Home = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const result = await axios.get(`${process.env.REACT_APP_APIURL}/products`);
    setProducts(result.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className='container py-5'>
      <div className='row col-10 mx-auto'>
        <div className='pb-5'>
          <h1 className='text-center mb-3'>ООО Фотон</h1>
          <p>Компания «ФОТОН» занимается производством тары и упаковки более 10 лет. За это время мы успели зарекомендовать себя на рынке как надежный и выгодный партнер. Наша компания - это всегда качественная продукция, быстрая доставка и квалифицированный сервис. Обратитесь к нам и получите максимальную выгоду! Наш профессионализм подтверждается положительными отзывами партнеров.</p>
          <h4>Процесс разработки</h4>
          <p>Изготовление тары по чертежам заказчика является наиболее простым вариантом. В тоже время имеется возможность выполнения чертежа инженерами компании-изготовителя по заданным параметрам – макету груза. Наиболее популярным современным способом проектирования является использование 3D-моделей.</p>
          <h4>Процесс производства</h4>
          <p>Процесс изготовления ящиков и тары проходит следующие технологические стадии: подготовка сырья к распиловке; выработка дощечек тары; сушка тарных дощечек; машинная обработка и ручная заделка дефектов; специальные пропитки; сортировка для формирования комплектов на тару; сборка упаковки; маркировка.</p>
        </div>
        <div>
          <h2 className='text-center mb-5'>Наши товары</h2>
          <div className='d-flex flex-wrap justify-content-between'>
            {products.map((product) => (
              <Product
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
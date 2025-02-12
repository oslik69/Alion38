import React, { useContext } from 'react';
import { Context } from '../index'; // Импортируем контекст
import { Button } from 'react-bootstrap'; // Импортируем компоненты из react-bootstrap
import { observer } from 'mobx-react-lite'; // Для использования mobx

const Basket = observer(() => {
  const { cartStore } = useContext(Context); // Получаем cartStore из контекста

  return (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <h2 style={{ textAlign: 'center' }}>Корзина</h2>
        
        {cartStore.cartItems.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Корзина пуста</p>
        ) : (
          cartStore.cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                padding: '15px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#f9f9f9',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={process.env.REACT_APP_API_URL + item.img}
                  alt={item.name}
                  style={{
                    width: '80px',
                    height: '80px',
                    marginRight: '15px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                  }}
                />
                <div>
                  <p style={{ margin: '0', fontWeight: 'bold' }}>{item.name}</p>
                  <p style={{ margin: '0', color: 'gray' }}>{item.price} ₽</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* Кнопки для увеличения и уменьшения количества */}
                <Button
                  variant="outline-secondary"
                  onClick={() => cartStore.decreaseQuantity(item.id)}
                  style={{ margin: '0 5px' }}
                >
                  -
                </Button>
                <span style={{ margin: '0 10px', fontWeight: 'bold' }}>{item.quantity}</span>
                <Button
                  variant="outline-secondary"
                  onClick={() => cartStore.addToCart(item)}
                  style={{ margin: '0 5px' }}
                >
                  +
                </Button>
                <Button
                  variant="danger"
                  onClick={() => cartStore.removeFromCart(item.id)}
                  style={{ marginLeft: '15px' }}
                >
                  Удалить
                </Button>
              </div>
            </div>
          ))
        )}

        {cartStore.cartItems.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <h3 style={{ fontWeight: 'bold' }}>
              Общая сумма: {cartStore.totalPrice} ₽
            </h3>
            {/* Кнопка оформить заказ */}
            <Button
              variant="primary"
              onClick={() => alert('Оформить заказ!')}  // Можно заменить на функцию оформления заказа
              style={{
                marginTop: '20px',
                background: 'linear-gradient(45deg, #ff6f61, #ffac41)', // Градиент
                borderColor: 'transparent',
                padding: '12px 30px',
                fontSize: '18px',
                fontWeight: 'bold',
                borderRadius: '50px',
                transition: 'all 0.3s ease-in-out',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            >
              Оформить заказ
            </Button>
          </div>
        )}
      </div>
    </div>
  );
});

export default Basket;

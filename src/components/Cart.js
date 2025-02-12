// Cart.js
import React, { useContext } from "react";
import { Context } from "../index";  // Импортируем контекст для доступа к store
import { observer } from "mobx-react-lite";
import { Button } from "react-bootstrap";  // Если используете компоненты из React-Bootstrap

const Cart = observer(() => {
    const { cart } = useContext(Context);  // Получаем данные корзины из контекста

    if (cart.cartItems.length === 0) {
        return <h2>Корзина пуста</h2>;
    }

    return (
        <div className="cart-container">
            <h2>Корзина</h2>
            <div className="cart-items">
                {cart.cartItems.map(item => (
                    <div key={item.id} className="cart-item">
                        <span>{item.name}</span>
                        <span> Количество: {item.quantity}</span>
                        <span> Цена: {item.price} ₽</span>
                        {/* Кнопки для изменения количества */}
                        <Button 
                            variant="outline-danger" 
                            onClick={() => cart.decreaseQuantity(item.id)}
                        >
                            -
                        </Button>
                        <Button 
                            variant="outline-success" 
                            onClick={() => cart.addToCart(item)}
                        >
                            +
                        </Button>
                        <Button 
                            variant="outline-warning" 
                            onClick={() => cart.removeFromCart(item.id)}
                        >
                            Удалить
                        </Button>
                    </div>
                ))}
            </div>
            <div className="cart-summary">
                <h3>Итого: {cart.totalPrice} ₽</h3>
                {/* Кнопка для очистки корзины */}
                <Button variant="outline-danger" onClick={cart.clearCart}>
                    Очистить корзину
                </Button>
            </div>
        </div>
    );
});

export default Cart;

import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE } from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useNavigate } from 'react-router-dom';

const NavBar = observer(() => {
    const { user, cartStore } = useContext(Context); // Добавляем cartStore из контекста
    const [cartItemCount, setCartItemCount] = useState(0); // Локальное состояние для количества товаров в корзине
    const navigate = useNavigate();

    useEffect(() => {
        // Обновляем количество товаров в корзине, когда cartStore изменяется
        setCartItemCount(cartStore.cart?.length || 0);
    }, [cartStore.cart]); // Зависимость от cartStore.cart

    const logOut = () => {
        user.setUser({});  // Очистка данных пользователя
        user.setIsAuth(false);  // Статус выхода
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink 
                    to={SHOP_ROUTE}
                    style={{
                        color: 'orange', 
                        fontSize: '2rem', 
                        fontWeight: 'bold', 
                        textTransform: 'uppercase', 
                        textDecoration: 'none'
                    }}
                >
                    Алион38
                </NavLink>

                <Nav.Item className="ml-auto">
                    <a 
                        href="https://2gis.ru/irkutsk/firm/70000001007226066?m=104.231319%2C52.336662%2F14.6" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{
                            textDecoration: 'none',
                            color: '#FFD700', // Желтый оттенок, который хорошо контрастирует с черным
                            fontWeight: 'bold', // Сделать текст жирным
                            fontSize: '16px',
                            textAlign: 'center',
                            display: 'block',
                            padding: '10px 0',
                        }}
                    >
                        Улица Мира, 3/1, 11 складское помещение
                    </a>
                </Nav.Item>

                {user.isAuth ? (
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            {user.isAdmin && (
                                <Button
                                    variant="outline-danger" // Красный цвет для админки
                                    onClick={() => navigate(ADMIN_ROUTE)}
                                    className="admin-panel-btn"
                                >
                                    Админ панель
                                </Button>
                            )}

                            <NavLink
                                to={BASKET_ROUTE}
                                className={({ isActive }) => 
                                    isActive ? 'active-cart' : ''
                                }
                                style={{
                                    textDecoration: 'none',
                                    color: 'white', 
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    padding: '10px 20px',
                                    border: '2px solid white',
                                    borderRadius: '5px',
                                    transition: 'all 0.3s',
                                }}
                            >
                                Корзина
                                {/* Отображаем количество товаров в корзине */}
                                {cartItemCount > 0 && (
                                    <span 
                                        className="cart-count"
                                        style={{
                                            marginLeft: '10px',
                                            backgroundColor: '#ff5733',
                                            borderRadius: '50%',
                                            padding: '3px 8px',
                                            color: 'white',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {cartItemCount}
                                    </span>
                                )}
                            </NavLink>
                        </div>

                        {/* Кнопка выхода */}
                        <Button
                            variant="outline-light"
                            onClick={logOut}
                            className="ml-2"
                            style={{
                                backgroundColor: '#007bff', // Синий фон
                                borderColor: '#007bff', // Синий цвет границы
                                color: 'white', // Белый текст
                                fontWeight: 'bold', // Жирный текст
                                padding: '8px 16px', // Размеры отступов
                                borderRadius: '5px', // Округлённые края
                                transition: 'all 0.3s ease',
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                        >
                            Выйти
                        </Button>
                    </Nav>
                ) : (
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        {/* Кнопка авторизации */}
                        <Button
                            variant="outline-primary"
                            onClick={() => navigate(LOGIN_ROUTE)}
                            style={{
                                backgroundColor: '#007bff', // Синий фон
                                borderColor: '#007bff', // Синий цвет границы
                                color: 'white', // Белый текст
                                fontWeight: 'bold', // Жирный текст
                                padding: '8px 16px', // Размеры отступов
                                borderRadius: '5px', // Округлённые края
                                transition: 'all 0.3s ease',
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                        >
                            Авторизация
                        </Button>
                    </Nav>
                )}
            </Container>

            <style>
                {`
                    .active-cart {
                        color: white; /* Текст белым */
                        font-weight: bold;
                        border: 2px solid #ffac41; /* Оранжевая рамка */
                        box-shadow: 0 0 10px #ffac41, 0 0 20px #ffac41; /* Эффект свечения */
                        animation: glow 1.5s ease-in-out infinite; /* Анимация для "горения" */
                    }

                    @keyframes glow {
                        0% {
                            box-shadow: 0 0 5px #ffac41, 0 0 10px #ffac41, 0 0 15px #ffac41;
                        }
                        50% {
                            box-shadow: 0 0 10px #ffac41, 0 0 20px #ffac41, 0 0 30px #ffac41;
                        }
                        100% {
                            box-shadow: 0 0 5px #ffac41, 0 0 10px #ffac41, 0 0 15px #ffac41;
                        }
                    }

                    .cart-count {
                        font-size: 1rem;
                        font-weight: bold;
                        background-color: #ff5733;
                        border-radius: 50%;
                        padding: 3px 8px;
                        color: white;
                    }
                `}
            </style>
        </Navbar>
    );
});

export default NavBar;

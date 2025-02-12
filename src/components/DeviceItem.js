import React, { useContext } from 'react';
import { Card, Col, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import './DeviceItem.css'; // Подключаем CSS для стилей

const DeviceItem = observer(({ device, onDelete }) => {
    const navigate = useNavigate();
    const { user, cartStore } = useContext(Context); // Используем cartStore

    // Обработчик для добавления товара в корзину
    const handleAddToCart = (e) => {
        e.stopPropagation(); // Останавливаем распространение события
        cartStore.addToCart(device);  // Добавляем товар в корзину
        console.log("Товары в корзине после добавления:", cartStore.cartItems);  // Логируем корзину после добавления товара
    };

    // Обработчик для удаления товара
    const handleDeleteClick = (e) => {
        e.stopPropagation(); // Останавливаем распространение события
        console.log("Удаление товара с id:", device.id);
        onDelete(device.id);  // Вызываем функцию удаления товара
    };

    return (
        <Col md={3} className="mt-3" onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card className="device-card">
                <Image width="250" height="250" src={process.env.REACT_APP_API_URL + device.img} style={{ objectFit: 'cover' }} />
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>{device.name}</div>
                </div>

                {/* Новый красивый блок с ценой */}
                <div className="device-price">
                    <span className="price-value">{device.price}</span> <span className="price-currency">₽</span>
                </div>

                {/* Кнопка для добавления в корзину */}
                <Button variant="success" onClick={handleAddToCart} className="mt-2 w-100">
                    Добавить в корзину
                </Button>

                {/* Кнопка для удаления товара, доступна только администратору */}
                {user.isAdmin && (
                    <Button 
                        variant="danger" 
                        onClick={handleDeleteClick} 
                        className="mt-2 w-100" 
                        size="sm"
                    >
                        Удалить
                    </Button>
                )}
            </Card>
        </Col>
    );
});

export default DeviceItem;

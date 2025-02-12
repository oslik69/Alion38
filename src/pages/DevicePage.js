import React, { useEffect, useState, useContext } from 'react';
import { Container, Image, Col, Row, Card, Button, Spinner } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from "../http/deviceAPI";
import { Context } from "../index";  // Импортируем контекст для работы с корзиной
import './DevicePage.css'; 

const DevicePage = () => {
    const { id } = useParams();
    const { cartStore } = useContext(Context); // Получаем cartStore из контекста
    const [device, setDevice] = useState({ info: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchOneDevice(id)
            .then(data => setDevice(data))
            .catch(error => console.error("Ошибка загрузки устройства:", error))
            .finally(() => setLoading(false));
    }, [id]);

    const addToCart = () => {
        // Добавляем устройство в корзину
        cartStore.addToCart(device);
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={5} className="text-center mb-4">
                    <div className="device-image-wrapper">
                        {device.img ? (
                            <Image className="device-image" src={process.env.REACT_APP_API_URL + device.img} />
                        ) : (
                            <div className="no-image">Нет изображения</div>
                        )}
                    </div>
                </Col>
                <Col md={4}>
                    <Card className="device-card shadow-lg p-4">
                        <h2 className="device-title">{device.name || "Название недоступно"}</h2>
                        <h3 className="device-price">{device.price ? `${device.price} руб.` : "Не указано"}</h3>
                        <Button className="btn-add-to-cart" variant="primary" onClick={addToCart}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col>
                    <h3 className="characteristics-title">Характеристики</h3>
                    {device.info.length > 0 ? (
                        device.info.map((info, index) => (
                            <Row key={info.id} className={`device-info-item ${index % 2 === 0 ? 'bg-light' : ''}`}>
                                <Col>{info.title}: {info.description}</Col>
                            </Row>
                        ))
                    ) : (
                        <p>Нет характеристик</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default DevicePage;

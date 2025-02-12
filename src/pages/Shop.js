import React, { useContext, useEffect } from 'react';
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import DeviceList from "../components/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchDevices, fetchTypes } from "../http/deviceAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const { device } = useContext(Context);

    // Первый useEffect для загрузки типов
    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data)); // Загружаем все типы
    }, []); // Загружается только один раз

    // Второй useEffect для загрузки устройств при изменении типа и страницы
    useEffect(() => {
        // Загружаем устройства для выбранного типа и текущей страницы
        fetchDevices(device.selectedType.id, device.page, 6).then(data => {
            device.setDevices(data.rows);        // Обновляем устройства
            device.setTotalCount(data.count);    // Обновляем общее количество устройств
        });
    }, [device.page, device.selectedType.id]); // Обновляем данные при изменении страницы или типа

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar /> {/* Панель фильтров с типами */}
                </Col>
                <Col md={9}>
                    <DeviceList /> {/* Список устройств */}
                    <Pages /> {/* Страница пагинации */}
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;

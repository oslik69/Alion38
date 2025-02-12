import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row, Col, Spinner, Alert } from "react-bootstrap"; // Используем Bootstrap компоненты
import DeviceItem from "./DeviceItem";
import { deleteDevice, fetchDevices } from "../http/deviceAPI";

const DeviceList = observer(() => {
    const { device } = useContext(Context);

    // Обработчик для удаления устройства
    const handleDelete = async (id) => {
        try {
            // Удаляем устройство через API
            await deleteDevice(id);

            // Получаем актуальный список устройств после удаления
            const updatedDevices = await fetchDevices(device.typeId, device.page, device.limit);

            // Логируем весь ответ от сервера
            console.log("Ответ от сервера после удаления:", updatedDevices);

            // Если сервер вернул поле 'rows', используем его, если 'devices' - используйте это.
            const devicesList = updatedDevices.rows || updatedDevices.devices;
            console.log("Обновленный список устройств:", devicesList);

            // Обновляем список устройств
            device.setDevices(devicesList);
        } catch (error) {
            console.error("Ошибка при удалении устройства:", error);
        }
    };

    // Обработчик отображения
    if (!device.devices.length) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    return (
        <div className="mt-4">
            {device.devices.length === 0 ? (
                <Alert variant="info" className="text-center">
                    Нет доступных устройств.
                </Alert>
            ) : (
                <Row className="g-4">
                    {device.devices.map((device) => (
                        <Col md={4} key={device.id} className="d-flex justify-content-center">
                            <DeviceItem device={device} onDelete={handleDelete} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
});

export default DeviceList;

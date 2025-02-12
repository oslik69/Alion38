import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button"; // Импортируем компонент кнопки
import { deleteType } from "../http/deviceAPI"; // Импортируем функцию для удаления категории
import './TypeBar.css'; // Подключаем CSS для стилей

const TypeBar = observer(() => {
    const { device, user } = useContext(Context); // Получаем данные о пользователе

    // Обработчик удаления категории
    const handleDelete = async (id) => {
        try {
            // Отправляем запрос на удаление категории
            await deleteType(id);
            // Обновляем список типов (удаляем из списка)
            device.setTypes(device.types.filter(type => type.id !== id));
        } catch (error) {
            console.error("Ошибка при удалении категории:", error);
        }
    };

    return (
        <div>
            {/* Добавляем текст над списком */}
            <h3>Категория товаров</h3>

            <ListGroup>
                {device.types.map(type =>
                    <ListGroup.Item
                        style={{ cursor: 'pointer' }}
                        active={type.id === device.selectedType.id}
                        onClick={() => device.setSelectedType(type)}
                        key={type.id}
                        className="type-item"
                    >
                        {type.name}
                        {/* Показываем кнопку удаления только для администратора */}
                        {user.isAdmin && (
                            <Button
                                variant="danger"
                                size="sm"
                                className="ml-2 delete-button"
                                onClick={(e) => {
                                    e.stopPropagation(); // Предотвращаем срабатывание onClick на родителе
                                    handleDelete(type.id);
                                }}
                            >
                                Удалить
                            </Button>
                        )}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>
    );
});

export default TypeBar;

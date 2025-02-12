import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check } from "./http/userAPI";
import { Spinner, Container } from "react-bootstrap";

const App = observer(() => {
    const { user } = useContext(Context); // Используем контекст напрямую
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await check(); // Проверка пользователя на сервере
                user.setUser(data); // Устанавливаем данные пользователя в store
                user.setIsAuth(true); // Статус авторизации
            } catch (e) {
                console.error("Ошибка проверки авторизации:", e);
            } finally {
                setLoading(false); // Завершаем загрузку
            }
        };

        fetchUser();
    }, [user]); // Добавляем user как зависимость, чтобы MobX обновил данные при изменении

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="grow" />
            </Container>
        );
    }

    return (
        <BrowserRouter>
            <NavBar /> {/* Навигационная панель */}
            <AppRouter /> {/* Роутер, который переключает страницы */}
        </BrowserRouter>
    );
});

export default App;

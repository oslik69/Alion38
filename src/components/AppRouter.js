// AppRouter.js
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes, adminRoutes } from '../Routes';
import { SHOP_ROUTE, BASKET_ROUTE } from '../utils/consts';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import Cart from '../components/Cart'; // Компонент корзины
import SearchResultsPage from '../components/CatalogPage'; // Страница результатов поиска

const AppRouter = observer(() => {
    const { user } = useContext(Context); // Получаем данные о пользователе

    return (
        <Routes>
            {/* Публичные маршруты (доступны всем пользователям) */}
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}

            {/* Защищённые маршруты для авторизованных пользователей */}
            {user.isAuth && authRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}

            {/* Админ маршруты для пользователей с ролью 'ADMIN' */}
            {user.isAuth && user.isAdmin && adminRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}

            {/* Корзина для всех пользователей */}
            <Route path={BASKET_ROUTE} element={<Cart />} />

            {/* Маршрут для результатов поиска */}
            <Route path="/search/:query" element={<SearchResultsPage />} />

            {/* Редирект на главную страницу, если маршрут не найден */}
            <Route path="*" element={<Navigate to={SHOP_ROUTE} />} />
        </Routes>
    );
});

export default AppRouter;

import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateType from '../components/modals/CreateType';
import CreateBrand from '../components/modals/CreateBrand';
import CreateDevice from '../components/modals/CreateDevice';
import { useNavigate } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../index';

const Admin = observer(() => {
    const { user } = useContext(Context); // Получаем данные пользователя
    const navigate = useNavigate();
    
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);

    useEffect(() => {
        // Логируем роль пользователя для отладки
        console.log('User role:', user.role);
        if (!user.isAdmin) {
            console.log('User is not admin, redirecting...');
            navigate(SHOP_ROUTE); 
        }
    }, [user.isAdmin, user.role, navigate]);  // Добавляем user.role в зависимости

    // Если пользователь не админ, пока происходит редирект, можно вернуть пустой компонент или спиннер
    if (!user.isAdmin) {
        return <div>Loading...</div>; // Выводим индикатор загрузки или пустой компонент
    }

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setTypeVisible(true)}
            >
                Добавить категорию
            </Button>

            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setDeviceVisible(true)}
            >
                Добавить товар
            </Button>

            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
        </Container>
    );
});

export default Admin;

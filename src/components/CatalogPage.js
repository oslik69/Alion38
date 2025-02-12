import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import DeviceItem from './DeviceItem';  // Импортируем компонент для отображения товаров
import { observer } from 'mobx-react-lite';
import NavBar from './NavBar'; // Импортируем NavBar

const CatalogPage = observer(() => {
    const [products, setProducts] = useState([]);  // Все товары
    const [filteredProducts, setFilteredProducts] = useState([]);  // Отфильтрованные товары

    useEffect(() => {
        // Здесь можно загрузить товары с API или из состояния
        const fetchedProducts = [
            { id: 1, name: 'Телефон', price: 20000, img: 'image1.jpg' },
            { id: 2, name: 'Ноутбук', price: 50000, img: 'image2.jpg' },
            { id: 3, name: 'Наушники', price: 3000, img: 'image3.jpg' },
            // Другие товары...
        ];
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);  // Изначально показываем все товары
    }, []);

    const handleSearch = (query) => {
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())  // Фильтруем товары по названию
        );
        setFilteredProducts(filtered);
    };

    // Функция для удаления товара
    const handleDeleteProduct = (productId) => {
        setProducts(prevProducts => prevProducts.filter(product => product.id !== productId)); // Удаляем товар из списка
        setFilteredProducts(prevProducts => prevProducts.filter(product => product.id !== productId)); // Обновляем отфильтрованные товары
    };

    return (
        <div>
            <NavBar onSearch={handleSearch} />  {/* Передаем функцию поиска в NavBar */}
            <Container>
                <Row>
                    {filteredProducts.map((product) => {
                        return (
                            <DeviceItem
                                key={product.id}
                                device={product}
                                onDelete={handleDeleteProduct}  // Передаем функцию удаления в компонент
                            />
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
});

export default CatalogPage;

// src/components/SearchBar.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './SearchBar.css';  // Подключаем стили для компонента

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);  // Отправляем запрос на поиск
    };

    return (
        <div className="search-bar">
            <Form onSubmit={handleSubmit} className="my-4">
                <Form.Group controlId="searchQuery">
                    <Form.Control
                        type="text"
                        placeholder="Поиск..."
                        value={query}
                        onChange={handleChange}  // Обновляем query
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-2">
                    Найти
                </Button>
            </Form>
        </div>
    );
};

export default SearchBar;

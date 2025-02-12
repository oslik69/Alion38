// userAPI.js
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const API_URL = 'http://localhost:5000/api/user';

const $api = axios.create({
    baseURL: API_URL
});

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

export const registration = async (email, password) => {
    const { data } = await $api.post('/registration', { email, password, role: 'USER' });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token); // Декодируем токен и получаем данные пользователя
}

export const login = async (email, password) => {
    const { data } = await $api.post('/login', { email, password });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token); // Декодируем токен и получаем данные пользователя
}

export const check = async () => {
    const { data } = await $api.get('/auth');
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token); // Декодируем токен и получаем данные пользователя
}

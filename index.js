require('dotenv').config(); // Загружаем .env в process.env

const express = require('express');
const sequelize = require('./db'); // Импортируем подключение к базе
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');

const router = require('./routes/index'); // Основные маршруты
const errorHandler = require('./middleware/ErrorHandlingMiddleware'); // Миддлвар для обработки ошибок

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));

app.use('/api', router); // Роуты подключаются по префиксу "/api"

// Выводим SECRET_KEY в консоль (убери после тестов)
console.log("SECRET_KEY загружен:", process.env.SECRET_KEY || "❌ НЕ ЗАГРУЗИЛСЯ!");

// Обработка ошибок (должен быть последним!)
app.use(errorHandler);

// Функция старта сервера
const start = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('Database synced'); 

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log('Error syncing database:', e);
    }
};

// Запускаем сервер
start();

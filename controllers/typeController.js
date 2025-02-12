const { Type } = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res, next) {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({ message: "Поле name обязательно" });
            }

            const type = await Type.create({ name });
            return res.json(type);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const types = await Type.findAll();
            return res.json(types);
        } catch (error) {
            next(error);
        }
    }

    // Новый метод для удаления категории
    async delete(req, res, next) {
        const { id } = req.params;
        try {
            // Удаление категории по ID
            const type = await Type.destroy({ where: { id } });

            // Если категория не найдена, возвращаем ошибку
            if (!type) {
                return res.status(404).json({ message: "Категория не найдена" });
            }

            // Успешное удаление категории
            return res.status(200).json({ message: "Категория удалена" });
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = new TypeController();

const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');
const checkRole = require('../middleware/checkRoleMiddleware');

// Роуты для создания и получения категорий
router.post('/', checkRole('ADMIN'), typeController.create);
router.get('/', typeController.getAll);

// Добавляем маршрут для удаления категории
router.delete('/:id', checkRole('ADMIN'), typeController.delete);

module.exports = router;

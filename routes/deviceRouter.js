const Router = require('express');
const router = new Router();
const deviceController = require('../controllers/deviceController');

router.post('/', deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);
// Новый маршрут для удаления устройства
router.delete('/:id', deviceController.delete);

module.exports = router;


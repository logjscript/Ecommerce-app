const { Router } = require('express');
const controller = require('./controller');

const router = Router()

router.get('/', controller.getUsers);
router.post('/', controller.addUser);
router.post('/:username', controller.getUserById);
router.delete('/:username', controller.deleteUser);
router.put('/:username', controller.updateUserInfo);

module.exports = router;
const express = require('express');
const router = express.Router();

const columnRoutes = require('../controller/column');

router.post('/create', columnRoutes.createColumn);
router.get('/:columnId', columnRoutes.getColumn);
router.get('/:boardId', columnRoutes.fetchAll);
router.post('/:columnId', columnRoutes.changeColumn);   



module.exports = router;
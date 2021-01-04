const express = require('express');
const router = express.Router();
const BoardRoutes = require('../controller/boards');

// Routes 

router.post('/create', BoardRoutes.createBoard);
router.get('/geAll', BoardRoutes.getAllBoards);
router.get('/:boardId', BoardRoutes.getBoard);
router.post('/reorder', BoardRoutes.reorderBoard);


module.exports = router;


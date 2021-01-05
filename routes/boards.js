const express = require('express');
const router = express.Router();
const BoardRoutes = require('../controller/boards');

// Routes 

router.post('/create', BoardRoutes.createBoard);
router.get('/getAll', BoardRoutes.getAllBoards);
router.get('/:boardId', BoardRoutes.getBoard);
router.post('/reorder', BoardRoutes.reorderBoard);
router.delete('/delete/:boardId', BoardRoutes.deleteBoard);


module.exports = router;


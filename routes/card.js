const express = require('express');
const router = express.Router();

const Cardcontroller = require('../controller/card');

router.post('/create', Cardcontroller.createCard);
router.get('/fetchAll', Cardcontroller.fetchAll);
router.post('/card/:cardId', Cardcontroller.editTitle);
router.post('reorder/samecol', Cardcontroller.ReorderSameCol);
router.post('/reorde/differentCol', Cardcontroller.DifferentSameCol);

module.exports = router;
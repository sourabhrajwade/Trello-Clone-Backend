const mongoose = require('mongoose');


const BoardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  columnOrder: [{ type: String, ref: 'columns' }],
});

const Board = mongoose.model('Boards', BoardSchema, 'boards');

module.exports = Board;

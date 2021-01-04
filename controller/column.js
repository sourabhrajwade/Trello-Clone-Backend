const mongoose = require('mongoose');

const Column = require('../models/column');
const Boards = require('../models/boards');
const Board = require('../models/boards');

exports.createColumn = async (req, res, next) => {
    try {
        const { title, boardId, columnId } = req.body;
        const column = await Column.create({
            board: boardId,
            title,
            cardIds: [],
            columnId
        });
        const board = await Board.findById(boardId);
        if (!board) {
            res.status(400).json({
                message: 'Board doesnot exist'
            })
        }
        const newColumnOrder = Array.from(board.columnOrder);
        newColumnOrder.push(column.columnId);
        const updateBoard = await Board.findByIdAndUpdate(board._Id, { columnOrder: newColumnOrder });
        if (updateBoard) {
            res.status(200).json({
                column,
                board
            });
        }
    } catch (error) {
        res.status(400).json({
            error
        });
    }
}

// route GET /api/v1/column/:columnId
// Get column with Id.

exports.getColumn = async (req, res, next) => {
    try {
        const column = await Column.findOne({ _id: req.param.columnId });
        if (!column) {
            return res.status(400).json({
                message: 'Column not found.'
            })
        }
        res.status(200).json({
            message: 'Success',
            column
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error
        });
    }


}

// route GET /api/v1/column/:boardId
// Fetch all the columns of board

exports.fetchAll = async (req, res, next) => {
    try {
        const { boardId } = req.params;

        const board = await Board.findOne({ _id: boardId });
        if (!board) {
            return res
                .status(404)
                .json({ message: 'Board with given id was not found' });
        }
        const column = await Column.find({ board: boardId });
        if (!column) {
            return res.status(400).json({
                message: "Column doesnot exist."
            });
        }
        return res
            .status(200)
            .json({ message: 'success', columns: columns, board: board });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            error
        });
    }
}

// router POST /api/v1/column/:columnId
// Change column id content

exports.changeColumn = async (res, req, next) => {
    const { columnId } = req.params;

    if (req.body.title) {
        const column = Column.findOneAndUpdate(columnId, { title: req.body.title }, { new: true })
    }
    if (!column) {
        return res
            .status(404)
            .json({ message: 'unable to find the column of provided id' });
    }

    return res
        .status(200)
        .json({ message: 'column title updated ', data: column.title });
}
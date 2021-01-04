
const mongoose = require('mongoose');

// Import the board model
const Board = require('../models/boards');

// Route POST api/v1/boards/create
// Create new board
exports.createBoard = async  (req, res, next) => {
    const {title} = req.body;
    try {
        const newBoard = await Board.create({
            title,
            columnOrder: []
        });
        return res.status(200).json({
            message: 'Board created',
            board: newBoard
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error.error.message
        });
    }
    

}

// Router Get /api/v1/boards/fetchAll
// Get all boards
exports.getAllBoards = async (req, res, next) => {
    try {
        const boards = await Board.find();
    if (boards) {
        res.status(200).json({
            boards
        });
    }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message
        });
        
    }
    
}

//  Route Get api/v1/boards/:boardId
// Select one boards

exports.getBoard = async (req, res, next) => {
    try {
        const board = await Board.findOne({_id: req.params.boardId});

        if (board) {
            res.status(200).json({
                boards
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: error.message
        });
    }
   
}

// Router Patch  /api/v1/boards/reorder
// Reorder columns in a board
exports.reorderBoard = async (req,res,next) => {
    try {
        const {boardId, newColumnOrder} = req.body;
    if (boardId && newColumnOrder)  {
        const updatedBoard = await Board.findByIdAndUpdate(boardId, {columnOrder: newColumnOrder});
    }
    if (board) {
        res.status(200).json({
            board: updatedBoard
        });
    }
    } catch (error) {
       console.log(error);
       res.status(400).json({
        error: error.message
    }); 
    }
    
}

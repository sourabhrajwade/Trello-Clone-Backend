const mongoose = require('mongoose');

const Card = require('../models/card');
const Column = require('../models/column');

// route POST /api/v1/card/create
// Create new card
exports.createCard = async (req, res, next) => {
    try {
        const { title, columnId, cardId } = req.body;
        const card = await Card.create({
            title,
            column: columnId,
            cardId
        });
        const column = await Column.findOne({ columnId });
        if (!column) {
            return res
                .status(404)
                .json({ message: "Column of provided id doesn't exist" });
        }
        const newCardId = Array.from(column.cardId);
        newCardId.push(card.cardId);
        const updateColumn = await Column.findByIdAndUpdate(column._id, { cardId: newCardId });
        const column2 = await Column.findOne({ columnId });
        return res.status(200).json({
            message: 'New card created and column updated',
            card,
            column: column2
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error occured',
            error: error.message
        });
    }
}

// route GET /api/v1/cards/fetchAll
// Get all the cards

exports.fetchAll = async (req, res, next) => {
    try {
        const { columnIds } = req.body;

        let totalCards = [];
        if (columnIds && columnIds.length > 0) {
            let i = 0;
            for (const columnId of columnIds) {
                const cards = await Card.find({ column: columnId }).select('cardId title');

                if (cards.length > 0) {
                    totalCards.push(cards)
                }
            }
            return res.status(200).json({ message: 'Success', cards: totalCards });
        }

    } catch (error) {
        res.status(400).json({
            message: 'Error occured',
            error: error.message
        });
    }
}

// Edit title of card
// route POST /api/v1/cards/card/:cardId

exports.editTitle = async (req, res, next) => {
    try {
        const { cardId } = req.params;
        if (req.query.title) {
            const card = await Card.findOneAndUpdate(cardId, { content: req.body.title })
        }
        if (!card) {
            return res
                .status(404)
                .json({ message: 'unable to find card ' });
        }
        return res
            .status(201)
            .json({ message: 'card content/title updated', data: card.content });
    }
    catch (error) {
        res.status(400).json({
            message: 'Error occured',
            error: error.message
        });
    }
}

// route POST /api/v1/card/reorder/samecol

exports.ReorderSameCol = async (req, res, next) => {
    try {
        const { sameColId, sameColCardId } = req.body;

        const column = await Column.findOne({ columnId: sameColId});
        if (!column) {
            res.status(400).json({
                message: "Column doesnot exist for id"
            });
        }
        const saveCol = await Column.findByIdAndUpdate(column._id, {cardId: sameColCardId});
        return res
      .status(200)
      .json({ message: 'same column reorder success', saveCol });
    } catch (error) {
        res.status(400).json({
            message: 'Error occured',
            error: error.message
        });
    }
}


// route POST /api/v1/card/reorder/differentCol

exports.DifferentSameCol = async (req, res, next) => {
    const {
        removedColumnId,
        addedColumnId,
        removedColumnCardIds,
        addedColumnCardIds,
      } = req.body;

    try {
        if (
            !(
              removedColumnId &&
              addedColumnId &&
              removedColumnCardIds &&
              addedColumnCardIds
            )
          ) {
            return res.status(400).json({ message: 'some fields are missing' });
          }
          const removedcolumn = await Column.findOne({ columnId: removedColumnId });
          removedcolumn.set({ cardIds: removedColumnCardIds });
          await removedcolumn.save();
    
          const addedcolumn = await Column.findOne({ columnId: addedColumnId });
          addedcolumn.set({ cardIds: addedColumnCardIds });
          await addedcolumn.save();
    
          return res
            .status(200)
            .json({ message: 'different column reorder success' });
    } catch (error) {
        res.status(400).json({
            message: 'Error occured',
            error: error.message
        });
    }
}
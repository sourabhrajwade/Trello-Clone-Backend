const mongoose = require( "mongoose");



const ColumnSchema = new mongoose.Schema({
    board:{type: mongoose.Schema.Types.ObjectId, ref:'boards'},
    title:{type:String, required:true},
    columnId:{type:String,required: true},
    cardIds:[{type:String, ref:'cards'}]
});

const Column = mongoose.model('columns', ColumnSchema, 'columns');

module.exports= Column;
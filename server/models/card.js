const {Schema, model} = require('mongoose')


const Card = new Schema({
    label: {type:String, required:true},
    cusType: {type:Array, required:true},
    category: {type:Array, required:true},
    link: {type:String}

})


module.exports = model('Card' , Card)
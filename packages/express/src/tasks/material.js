const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  },
  material: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material'
  },
  quantity1: Number,
  quantity2: Number,
  price: Number,
  difference: Number,
  total: Number,
}, { collation: 'taskmaterials' })

const TaskMaterial = mongoose.model('TaskMaterial', schema)
module.exports = TaskMaterial

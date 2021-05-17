import {model, Schema} from 'mongoose'

export const TaskMaterial = model('TaskMaterial',
  new Schema({
    task: {
      type: Schema.Types.ObjectId,
      ref: 'Task'
    },
    material: {
      type: Schema.Types.ObjectId,
      ref: 'Material'
    },
    quantity1: Number,
    quantity2: Number,
    price: Number,
    difference: Number,
    total: Number,
  }))

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    tower: {
        type: String,
        uppercase: true
    },
    coverage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coverage'
    }
}, { collation: 'towers' })

const Tower = mongoose.model('Tower', schema)
module.exports = Tower
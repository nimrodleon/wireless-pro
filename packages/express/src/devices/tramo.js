const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    tramo: {
        type: String,
        uppercase: true
    },
    coverage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coverage'
    }
}, { collation: 'tramos' })

const Tramo = mongoose.model('Tramo', schema)
module.exports = Tramo
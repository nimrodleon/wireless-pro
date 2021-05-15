const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    ipAddress: String,
    mode: String,
    name: {
        type: String,
        uppercase: true
    },
    userName: String,
    password: String,
    ssid: {
        type: String,
        uppercase: true
    },
    coverage: String,
    tower: String,
    tramo: String,
    accessPoint: String,
}, { collation: 'devices' })

const Device = mongoose.model('Device', schema)
module.exports = Device
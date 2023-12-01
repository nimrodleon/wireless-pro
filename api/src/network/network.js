const {averiaRouter} = require("../components/averia/network")
const {clientRouter} = require("../components/client/network")
const {coverageRouter} = require("../components/coverage/network")
const {deviceRouter} = require("../components/device/network")
const {infoRouter} = require("../components/info/network")
const {materialRouter} = require("../components/material/network")

module.exports = {
  averiaRouter,
  clientRouter,
  coverageRouter,
  deviceRouter,
  infoRouter,
  materialRouter,
}

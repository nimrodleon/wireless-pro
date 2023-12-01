const {averiaRouter} = require("../components/averia/network")
const {clientRouter} = require("../components/client/network")
const {coverageRouter} = require("../components/coverage/network")
const {deviceRouter} = require("../components/device/network")
const {infoRouter} = require("../components/info/network")
const {materialRouter} = require("../components/material/network")
const {mikrotikRouter} = require("../components/mikrotik/network")
const {workOrderRouter} = require("../components/orders/network")
const {outageRouter} = require("../components/outage/network")
const {paymentRouter} = require("../components/payment/network")
const {serviceRouter} = require("../components/service/network")
const {servicePlanRouter} = require("../components/serviceplan/network")

module.exports = {
  averiaRouter,
  clientRouter,
  coverageRouter,
  deviceRouter,
  infoRouter,
  materialRouter,
  mikrotikRouter,
  workOrderRouter,
  outageRouter,
  paymentRouter,
  serviceRouter,
  servicePlanRouter,
}

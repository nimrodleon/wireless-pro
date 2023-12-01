const {authRouter} = require("./auth/network")
const {averiaRouter} = require("./averia/network")
const {clientRouter} = require("./client/network")
const {coverageRouter} = require("./coverage/network")
const {deviceRouter} = require("./device/network")
const {infoRouter} = require("./info/network")
const {materialRouter} = require("./material/network")
const {mikrotikRouter} = require("./mikrotik/network")
const {workOrderRouter} = require("./orders/network")
const {outageRouter} = require("./outage/network")
const {paymentRouter} = require("./payment/network")
const {serviceRouter} = require("./service/network")
const {servicePlanRouter} = require("./serviceplan/network")
const {towerRouter} = require("./tower/network")
const {tramoRouter} = require("./tramo/network")
const {bitWorkerRouter} = require("./worker/network")

module.exports = {
  authRouter,
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
  towerRouter,
  tramoRouter,
  bitWorkerRouter,
}

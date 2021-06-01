import * as network from './network'
import servicePlanRouter from '../components/serviceplan/network'
import serviceRouter from '../components/service/network'
import outageRouter from '../components/outage/network'
import paymentRouter from '../components/payment/network'
import taskRouter from '../components/task/network'
import tramoRouter from '../components/tramo/network'
import towerRouter from '../components/tower/network'

const routes = (server) => {
  server.use('/api/info', network.infoRouter)
  server.use('/api/users', network.authRouter)
  server.use('/api/clients', network.clientRouter)
  server.use('/api/service-plans', servicePlanRouter)
  server.use('/api/services', serviceRouter)
  server.use('/api/services/outages', outageRouter)
  server.use('/api/payments', paymentRouter)
  server.use('/api/coverages', network.coverageRouter)
  server.use('/api/material', network.materialRouter)
  server.use('/api/tasks', taskRouter)
  server.use('/api/averias', network.averiaRouter)
  server.use('/api/tower', towerRouter)
  server.use('/api/tramo', tramoRouter)
  server.use('/api/devices', network.deviceRouter)
}

export default routes

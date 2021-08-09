import * as network from './network'

const routes = (server) => {
  server.use('/api/info', network.infoRouter)
  server.use('/api/users', network.authRouter)
  server.use('/api/clients', network.clientRouter)
  server.use('/api/service-plans', network.servicePlanRouter)
  server.use('/api/services', network.serviceRouter)
  server.use('/api/payments', network.paymentRouter)
  server.use('/api/coverages', network.coverageRouter)
  server.use('/api/material', network.materialRouter)
  server.use('/api/outages', network.outageRouter)
  server.use('/api/averias', network.averiaRouter)
  server.use('/api/tower', network.towerRouter)
  server.use('/api/tramo', network.tramoRouter)
  server.use('/api/devices', network.deviceRouter)
  server.use('/api/installation_orders', network.installationOrderRouter)
  server.use('/api/mikrotik', network.mikrotikRouter)
  server.use('/api/bitWorker', network.bitWorkerRouter)
}

export default routes

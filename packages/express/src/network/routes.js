import infoRouter from '../components/info/network'
import authRouter from '../components/auth/network'
import clientRouter from '../components/client/network'
import servicePlanRouter from '../components/serviceplan/network'
import serviceRouter from '../components/service/network'
import outageRouter from '../components/outage/network'
import paymentRouter from '../components/payment/network'
import coverageRouter from '../components/coverage/network'
import materialRouter from '../components/material/network'
import taskRouter from '../components/task/network'
import averiaRouter from '../components/averia/network'
import tramoRouter from '../components/tramo/network'
import towerRouter from '../components/tower/network'
import deviceRouter from '../components/device/network'

const routes = (server) => {
  server.use('/api/info', infoRouter)
  server.use('/api/users', authRouter)
  server.use('/api/clients', clientRouter)
  server.use('/api/service-plans', servicePlanRouter)
  server.use('/api/services', serviceRouter)
  server.use('/api/services/outages', outageRouter)
  server.use('/api/payments', paymentRouter)
  server.use('/api/coverages', coverageRouter)
  server.use('/api/material', materialRouter)
  server.use('/api/tasks', taskRouter)
  server.use('/api/averias', averiaRouter)
  server.use('/api/tower', towerRouter)
  server.use('/api/tramo', tramoRouter)
  server.use('/api/devices', deviceRouter)
}

export default routes

import authRouter from '../components/auth/network'

const routes = (server) => {
  server.use('/api/info', require('../infos/router'))
  // server.use('/api/users', require('../auth/router'))
  server.use('/api/v1/users', authRouter)
  server.use('/api/clients', require('../clients/router'))
  server.use('/api/service-plans', require('../serviceplans/router'))
  server.use('/api/service-plans/report', require('../serviceplans/report'))
  server.use('/api/services', require('../services/router'))
  server.use('/api/services/outages', require('../services/outage-router'))
  server.use('/api/payments', require('../payments/router'))
  server.use('/api/coverages', require('../coverages/router'))
  server.use('/api/coverages/report', require('../coverages/report'))
  server.use('/api/report', require('../report/report'))
  server.use('/api/material', require('../material/router'))
  server.use('/api/tasks', require('../tasks/router'))
  server.use('/api/averias', require('../averia/router'))
  server.use('/api/tower', require('../devices/tower-router'))
  server.use('/api/tramo', require('../devices/tramo-router'))
  server.use('/api/devices', require('../devices/device-router'))
}

export default routes

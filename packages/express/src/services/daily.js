const Service = require('./services')

// Instalaciónes Diarias.
const report = async (date) => {
  try {
    const services = await Service.find({ createdAt: date })
      .populate({ path: 'client', select: 'fullName' })
      .populate({ path: 'servicePlan', select: 'name priceMonthly' })
    return services
  } catch (err) {
    console.log(err)
  }
}

module.exports = report

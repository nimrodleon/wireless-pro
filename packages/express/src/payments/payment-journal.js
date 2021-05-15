const Payment = require('./payments')

// Reporte de pagos diarios.
const paymentJournal = async (date) => {
  try {
    const payments = await Payment.find({ created_date: date })
      .populate({ path: 'client', select: 'fullName' })
      .populate({ path: 'service', select: 'ipAddress' })
    return payments
  } catch (err) {
    console.log(err)
  }
}

module.exports = paymentJournal

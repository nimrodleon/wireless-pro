import {model, Schema} from 'mongoose'
import moment from 'moment-timezone'

// Schema de servicio.
const serviceSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Client'
  },
  ipAddress: String,
  // [
  // H=>'Habilitado',
  // D=>'Deshabilitado',
  // N=>'Notificado',
  // S=>'Suspendido'
  // ]
  status: {
    type: String,
    default: 'H',
    enum: ['H', 'D', 'N', 'S']
  },
  servicePlanId: {
    type: Schema.Types.ObjectId,
    ref: 'ServicePlan'
  },
  initialDate: String,
  mikrotikId: {
    type: Schema.Types.ObjectId,
    ref: 'Mikrotik'
  },
  interfaceId: {
    type: Schema.Types.ObjectId,
    ref: 'Interface'
  },
  userName: String,
  password: String,
  basicNote: String,
  accessPoint: {
    type: Schema.Types.ObjectId,
    ref: 'Device'
  },
  macAddress: String,
  // lastOutage: String,
  // ============================================================
  address: String,
  city: String,
  region: String,
  coverageId: {
    type: Schema.Types.ObjectId,
    ref: 'Coverage'
  },
  // ============================================================
  paymentType: {
    type: String,
    default: 'PRE',
    enum: ['PRE', 'POS']
  },
  defPrice: {
    type: Boolean,
    default: false
  },
  price: Number,
  commonPayment: {
    type: String,
    default: 'M',
    enum: ['M', 'B', 'T', 'S', 'A']
  },
  paymentNote: String,
  // ============================================================
  lastPayment: {
    type: Schema.Types.ObjectId,
    ref: 'Payment'
  },
  // ============================================================
  createdAt: {
    type: Date,
    default: moment().utc().toDate()
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

// exportar modelo servicio.
// almacena la información del servicio contratado.
export const Service = model('Service', serviceSchema)

export interface Service {
  _id: string;
  clientId: string;
  ipAddress: string;
  status: string;
  servicePlanId: string;
  initialDate: string;
  mikrotikId: string;
  interfaceId: string;
  userName: string;
  password: string;
  basicNote: string;
  accessPoint: string;
  macAddress: string;
  address: string;
  city: string;
  region: string;
  coverageId: string;
  paymentType: string;
  defPrice: boolean;
  price: number;
  commonPayment: string;
  paymentNote: string;
  createdAt: any;
}

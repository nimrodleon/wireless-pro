export interface Payment {
  _id: string;
  clientId: string;
  serviceId: string;
  year: string;
  month: string;
  amount: number;
  paymentMethod: string;
  payFrom: string;
  payUp: string;
  note: string;
  user: string | any;
  createdAt: any;
}

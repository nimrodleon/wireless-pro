export interface WorkOrder {
  _id: string | any;
  userId: string | any;
  clientId: string;
  description: string;
  address: string;
  city: string;
  region: string;
  typeTask: string;
  servicePlanId: string;
  total: number;
  amount: number;
  statusOrder: string;
  createdAt: any;
}

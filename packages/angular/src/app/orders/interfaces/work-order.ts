export interface WorkOrder {
  _id: string;
  userId: string;
  clientId: string;
  address: string;
  city: string;
  region: string;
  typeInstallation: string;
  servicePlanId: string;
  costInstallation: number;
  amount: number;
  statusOrder: string;
  createdAt: any;
}

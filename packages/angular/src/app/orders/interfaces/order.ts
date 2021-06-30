export interface Order {
  clientId: string;
  address: string;
  city: string;
  region: string;
  typeInstallation: string;
  servicePlanId: string;
  costInstallation: number;
  amount: number;
  statusOrder: string;
}

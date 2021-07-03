export interface OrderMaterial {
  _id: string;
  orderId: string;
  materialId: string;
  description: string;
  quantity1: number;
  quantity2: number;
  price: number;
  difference: number;
  total: number;
}

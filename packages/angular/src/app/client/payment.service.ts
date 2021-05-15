import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Payment } from './payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseURL: string = environment.baseUrl + 'payments';

  constructor(private http: HttpClient) { }

  getPaymentList(clientId: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${clientId}/client`);
  }

  getPayment(id: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.baseURL}/${id}`);
  }

  create(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.baseURL, payment);
  }

  update(payment: Payment): Observable<Payment> {
    return this.http.patch<Payment>(`${this.baseURL}/${payment._id}`, payment);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}

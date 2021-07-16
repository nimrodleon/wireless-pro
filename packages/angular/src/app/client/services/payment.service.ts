import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Payment} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseURL: string = environment.baseUrl + 'payments';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient) {
  }

  // Lista de pagos.
  getPaymentList(serviceId: string, year: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${serviceId}/${year}`);
  }

  // Obtener pago por id.
  getPaymentById(id: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.baseURL}/${id}`);
  }

  // registrar pago.
  createPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.baseURL, payment);
  }

  // actualizar pago.
  updatePayment(payment: Payment): Observable<Payment> {
    return this.http.patch<Payment>(`${this.baseURL}/${payment._id}`, payment);
  }

  // borrar pago.
  deletePayment(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  // pago formGroup.
  formGroup(): FormGroup {
    return this.fb.group({
      _id: [null],
      clientId: ['', [Validators.required]],
      serviceId: ['', [Validators.required]],
      year: ['', [Validators.required]],
      month: ['', [Validators.required]],
      amount: [0, [Validators.required, Validators.min(0)]],
      paymentMethod: ['', [Validators.required]],
      payFrom: ['', [Validators.required]],
      payUp: ['', [Validators.required]],
      note: [''],
      user: [''],
      createdAt: [null]
    });
  }

  // valores por defecto.
  defaultValues(): Payment {
    return {
      _id: undefined,
      clientId: '',
      serviceId: '',
      year: '',
      month: '',
      amount: 0,
      paymentMethod: '',
      payFrom: '',
      payUp: '',
      note: '',
      user: '',
      createdAt: ''
    };
  }

}

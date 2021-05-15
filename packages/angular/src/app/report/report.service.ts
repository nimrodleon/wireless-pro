import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseURL: string = environment.baseUrl + 'report';

  constructor(private http: HttpClient) { }

  // Lista de Clientes por Cobrar.
  getReceivables(date: string): Observable<any> {
    return this.http.get(`${this.baseURL}/receivables/${date}`);
  }

  // Lista de Equipos Según Plan de Servicio.
  getCustomersByServicePlan(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}/customers-by-service-plan/${id}`);
  }

  // Lista de Servicios Sin Registro de Pago.
  getServicesWithoutPayment(): Observable<any> {
    return this.http.get(`${this.baseURL}/services-without-payment`);
  }

  // Lista de Clientes Archivados.
  getClientsDisconnected(): Observable<any> {
    return this.http.get(`${this.baseURL}/clients-disconnected`);
  }

  // Lista de Servicios Suspendidos.
  getDisconnectedServices(): Observable<any> {
    return this.http.get(`${this.baseURL}/disconnected-services`);
  }

  // Lista de Clientes activos.
  getActiveClients(): Observable<any> {
    return this.http.get(`${this.baseURL}/active-clients`);
  }

  // Pagos diarios.
  getPaymentJournal(date: string): Observable<any> {
    const uri = environment.baseUrl + 'payments';
    return this.http.get(`${uri}/report/payment-journal/${date}`);
  }

  // Instalaciones Diarias.
  getDailyInstallation(date: string): Observable<any> {
    const uri = environment.baseUrl + 'services';
    return this.http.get(`${uri}/report/daily/${date}`);
  }

}

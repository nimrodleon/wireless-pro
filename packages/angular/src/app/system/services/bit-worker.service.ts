import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BitWorkerService {
  private baseURL: string = environment.baseUrl + 'bitWorker';

  constructor(
    private http: HttpClient) {
  }

  // agregar mikrotik.
  addMikrotik(mikrotikId: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${mikrotikId}/mikrotik/add`);
  }

  // cargar arp a la cache.
  arpCache(mikrotikId: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${mikrotikId}/arp/cache`);
  }

  // cargar cola simple a la cache.
  simpleQueueCache(mikrotikId: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${mikrotikId}/simple-queue/cache`);
  }

  // buscar arp por ipAddress.
  getArpListByIpAddress(mikrotikId: string, ipAddress: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${mikrotikId}/getArpListByIpAddress/${ipAddress}`);
  }

  // buscar cola simple por ipAddress.
  getSimpleQueueByIpAddress(mikrotikId: string, ipAddress: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${mikrotikId}/getSimpleQueueByIpAddress/${ipAddress}`);
  }

  // borrar arp por id.
  deleteArpMigration(mikrotikId: string, arpId: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${mikrotikId}/deleteArpMigration/${arpId}`);
  }

  // borrar cola-simple por id.
  deleteSimpleQueueMigration(mikrotikId: string, simpleQueueId: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${mikrotikId}/deleteSimpleQueueMigration/${simpleQueueId}`);
  }

  // ====================================================================================================

  // lista arp.
  getArpList(mikrotikId: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${mikrotikId}/getArpList`);
  }

  // registrar arp item.
  createArpList(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}/createArpList`, data);
  }

  // obtener arp item por id.
  getArpListById(mikrotikId: string, serviceId: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${mikrotikId}/getArpListById/${serviceId}`);
  }

  // actualizar arp Item.
  updateArpList(serviceId: string, data: any): Observable<any> {
    return this.http.put(`${this.baseURL}/updateArpList/${serviceId}`, data);
  }

  // borrar arp item.
  deleteArpList(mikrotikId: string, serviceId: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${mikrotikId}/deleteArpList/${serviceId}`);
  }

  // cargar lista arp por campo disabled.
  getArpListByDisabled(mikrotikId: string, value: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${mikrotikId}/getArpListByDisabled/${value}`);
  }

  // ====================================================================================================

  // lista cola simple.
  getSimpleQueueList(mikrotikId: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${mikrotikId}/getSimpleQueueList`);
  }

  // registrar cola simple.
  createSimpleQueue(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}/createSimpleQueue`, data);
  }

  // obtener cola simple item por id.
  getSimpleQueueById(mikrotikId: string, serviceId: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${mikrotikId}/getSimpleQueueById/${serviceId}`);
  }

  // actualizar cola simple.
  updateSimpleQueue(serviceId: string, data: any): Observable<any> {
    return this.http.put(`${this.baseURL}/updateSimpleQueue/${serviceId}`, data);
  }

  // borrar cola simple.
  deleteSimpleQueue(mikrotikId: string, serviceId: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${mikrotikId}/deleteSimpleQueue/${serviceId}`);
  }

  // cargar lista cola simples por campo disabled.
  getSimpleQueueByDisabled(mikrotikId: string, value: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${mikrotikId}/getSimpleQueueByDisabled/${value}`);
  }

  // ====================================================================================================

  // Lista de estado de cambios.
  getWorkerActivities(serviceId: string, year: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${serviceId}/getWorkerActivities/${year}`);
  }

  // registrar cambios de estado.
  createWorkerActivity(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}/createWorkerActivity`, data);
  }

}

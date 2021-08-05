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
  getArpListById(mikrotikId: string, arpId: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${mikrotikId}/getArpListById/${arpId}`);
  }

  // actualizar arp Item.
  updateArpList(arpId: string, data: any): Observable<any> {
    return this.http.put(`${this.baseURL}/updateArpList/${arpId}`, data);
  }

  // borrar arp item.
  deleteArpList(mikrotikId: string, arpId: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${mikrotikId}/deleteArpList/${arpId}`);
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
  getSimpleQueueById(mikrotikId: string, simpleQueueId: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${mikrotikId}/getSimpleQueueById/${simpleQueueId}`);
  }

  // actualizar cola simple.
  updateSimpleQueue(simpleQueueId: string, data: any): Observable<any> {
    return this.http.put(`${this.baseURL}/updateSimpleQueue/${simpleQueueId}`, data);
  }

  // borrar cola simple.
  deleteSimpleQueue(mikrotikId: string, simpleQueueId: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${mikrotikId}/deleteSimpleQueue/${simpleQueueId}`);
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

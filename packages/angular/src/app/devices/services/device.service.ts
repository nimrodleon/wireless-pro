import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Device} from '../interfaces/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private baseURL: string = environment.baseUrl + 'devices';

  constructor(private http: HttpClient) {
  }

  getDevices(id: string, opt: string): Observable<Device[]> {
    return this.http.get<Device[]>(this.baseURL + '/' + id + '/' + opt);
  }

  getDevice(id: string): Observable<Device> {
    return this.http.get<Device>(this.baseURL + '/' + id);
  }

  create(device: Device): Observable<Device> {
    return this.http.post<Device>(this.baseURL, device);
  }

  update(device: Device): Observable<Device> {
    return this.http.patch<Device>(this.baseURL + '/' + device._id, device);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.baseURL + '/' + id);
  }

}

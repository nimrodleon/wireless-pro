import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Info } from './info.model';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private baseURL: string = environment.baseUrl + 'info';

  constructor(private http: HttpClient) { }

  getInfo(): Observable<Info> {
    return this.http.get<Info>(this.baseURL);
  }

  update(info: Info): Observable<Info> {
    return this.http.patch<Info>(`${this.baseURL}/${info._id}`, info);
  }
}

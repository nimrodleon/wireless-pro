import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {Material} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private baseURL = environment.baseUrl + 'material';

  constructor(private http: HttpClient) {
  }

  getMaterials(query: string = ''): Observable<Material[]> {
    let params = new HttpParams();
    params = params.append('search', query);
    return this.http.get<Material[]>(this.baseURL, {params: params});
  }

  getMaterial(id: string): Observable<Material> {
    return this.http.get<Material>(`${this.baseURL}/${id}`);
  }

  create(material: Material): Observable<Material> {
    return this.http.post<Material>(`${this.baseURL}`, material);
  }

  update(material: Material): Observable<Material> {
    return this.http.patch<Material>(`${this.baseURL}/${material._id}`, material);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  countTaskMaterials(id: string): Observable<any> {
    return this.http.get(this.baseURL + '/' + id + '/count/material');
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {OrderMaterial} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderMaterialService {
  private baseURL: string = environment.baseUrl + 'installation_orders';

  constructor(
    private http: HttpClient) {
  }

  // Lista de materiales.
  getMaterials(id: string): Observable<OrderMaterial[]> {
    return this.http.get<OrderMaterial[]>(`${this.baseURL}/${id}/material`);
  }

  // Obtener material por id.
  getMaterial(id: string): Observable<OrderMaterial> {
    return this.http.get<OrderMaterial>(`${this.baseURL}/show/material/${id}`);
  }

  // registrar material.
  addMaterial(data: OrderMaterial): Observable<OrderMaterial> {
    return this.http.post<OrderMaterial>(`${this.baseURL}/add/material`, data);
  }

  // actualizar material.
  updateMaterial(data: OrderMaterial): Observable<OrderMaterial> {
    return this.http.patch<OrderMaterial>(`${this.baseURL}/update/material/${data._id}`, data);
  }

  // borrar material.
  deleteMaterial(id: string): Observable<OrderMaterial> {
    return this.http.delete<OrderMaterial>(`${this.baseURL}/delete/material/${id}`);
  }

  // Valores por defecto.
  defaultValues(): OrderMaterial {
    return {
      _id: undefined,
      orderId: '',
      materialId: '',
      description: '',
      quantity1: 0,
      quantity2: 0,
      price: 0,
      difference: 0,
      total: 0,
    };
  }

}

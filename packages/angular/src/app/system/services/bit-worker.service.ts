import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {any} from 'codelyzer/util/function';

@Injectable({
  providedIn: 'root'
})
export class BitWorkerService {

  constructor(
    private http: HttpClient) {
  }

  // agregar mikrotik.
  addMikrotik(data: any): Observable<any> {
    return null;
  }

  // cargar arp a la cache.

  // cargar cola simple a la cache.

  // buscar arp por ipAddress.

  // buscar cola simple por ipAddress.

  // ====================================================================================================

  // lista arp.

  // registrar arp item.

  // obtener arp item por id.

  // actualizar arp Item.

  // borrar arp item.

  // cargar lista arp por campo disabled.

  // ====================================================================================================

  // lista cola simple.

  // registrar cola simple.

  // obtener cola simple item por id.

  // actualizar cola simple.

  // borrar cola simple.

  // cargar lista cola simples por campo disabled.

}

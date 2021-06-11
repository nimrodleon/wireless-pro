import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {DeviceTramoService} from './device-tramo.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceListService {
  private baseURL: string = environment.baseUrl + 'devices';
  private _coverages: Array<any> | undefined;
  private _currentTramoId: string;

  constructor(
    private http: HttpClient,
    private deviceTramoService: DeviceTramoService) {
    // Cargar areas de cobertura.
    this.deviceTramoService.getCoveragesByTramos()
      .subscribe(res => {
        this._coverages = res;
        // Agregar tramos a las areas de cobertura.
        this._coverages.forEach(item => {
          this.deviceTramoService.getTramosByCoverage(item._id)
            .subscribe(res => item.tramos = res);
        });
      });
  }

  // Array de areas cobertura con tramos incluidos.
  get coverages(): Array<any> {
    return this._coverages!;
  }

  // Id del tramo actual.
  get currentTramoId(): string {
    return this._currentTramoId;
  }

  // actualizar el id del tramo actual.
  setCurrentTramoId(id): void {
    this._currentTramoId = id;
  }

}

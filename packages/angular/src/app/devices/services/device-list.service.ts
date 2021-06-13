import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {DeviceTramoService} from './device-tramo.service';
import {Device} from '../interfaces';
import {Coverage, Tramo, Tower} from '../../system/interfaces';
import {CoverageService, TowerService, TramoService} from '../../system/services';

@Injectable({
  providedIn: 'root'
})
export class DeviceListService {
  private baseURL: string = environment.baseUrl + 'devices';
  private _coverages: Array<any> | undefined;
  private _currentTramoId: string;
  private _devices: Array<Device> | undefined;
  private _currentDevice: Device = {
    _id: '',
    ipAddress: '',
    mode: '',
    name: '',
    userName: '',
    password: '',
    ssid: '',
    coverage: '',
    tower: '',
    tramo: '',
    accessPoint: '',
  };
  // Variables para el formulario modal.
  private _coveragesList: Array<Coverage> | undefined;
  private _tramosList: Array<Tramo> | undefined;
  private _towersList: Array<Tower> | undefined;

  constructor(
    private http: HttpClient,
    private deviceTramoService: DeviceTramoService,
    private coverageService: CoverageService,
    private tramoService: TramoService,
    private towerService: TowerService) {
  }

  // Cargar areas de cobertura.
  loadCoverages(): void {
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

  // Dispositivo actual.
  get currentDevice(): Device {
    return {...this._currentDevice};
  }

  // Array de areas cobertura con tramos incluidos.
  get coverages(): Array<any> {
    return this._coverages!;
  }

  // Lista de equipos.
  get devices(): Array<Device> {
    return this._devices;
  }

  // Id del tramo actual.
  get currentTramoId(): string {
    return this._currentTramoId;
  }

  // Lista de areas cobertura.
  get coveragesList(): Array<Coverage> {
    return this._coveragesList;
  }

  // Lista de tramos.
  get tramosList(): Array<Tramo> {
    return this._tramosList;
  }

  // Lista de torres.
  get towersList(): Array<Tower> {
    return this._towersList;
  }

  // actualizar el id del tramo actual.
  setCurrentTramoId(id): void {
    this._currentTramoId = id;
  }

  // Obtener equipos por tramo.
  getDevicesByTramo(id): void {
    this.http.get<Array<Device>>(this.baseURL + '/tramo/' + id)
      .subscribe(res => this._devices = res);
  }

  // Cargar valores cuando se carga el device-modal component.
  loadValuesDeviceModal(): void {
    // Lista de areas cobertura.
    this.coverageService.getCoverages()
      .subscribe(res => this._coveragesList = res);
    // Lista de tramos.
    this.tramoService.getTramosV1()
      .subscribe(res => this._tramosList = res);
    // Lista de torres.
    this.towerService.getTowersV1()
      .subscribe(res => this._towersList = res);
  }


}

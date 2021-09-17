import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {DeviceTramoService} from './device-tramo.service';
import {DeviceService} from './device.service';
import {AuthService} from 'src/app/user/services/auth.service';
import {Device} from '../interfaces';
import {Coverage, Tramo, Tower} from '../../system/interfaces';
import {CoverageService, TowerService, TramoService} from '../../system/services';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DeviceListService {
  private baseURL: string = environment.baseUrl + 'devices';
  private _coverages: Array<any> | undefined;
  private _currentTramoId: string = '';
  private _devices: Array<Device> | undefined;
  private _currentDevice: Device = DeviceListService.defaultDeviceEmpty();
  // Variables para el formulario modal.
  private _coveragesList: Array<Coverage> | undefined;
  private _tramosList: Array<Tramo> | undefined;
  private _towersList: Array<Tower> | undefined;
  public titleModal: string = '';
  // Variables de autentificación y autorización.
  private _currentRole: string = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private deviceService: DeviceService,
    private deviceTramoService: DeviceTramoService,
    private coverageService: CoverageService,
    private tramoService: TramoService,
    private towerService: TowerService) {
  }

  // valor por defecto del nuevo equipo.
  private static defaultDeviceEmpty(): Device {
    return {
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
  }

  // Obtener el rol del usuario autentificado.
  getRoles(): void {
    this.authService.getRoles()
      .subscribe((res: string) => this._currentRole = res);
  }

  // Cargar areas de cobertura.
  loadCoverages(): void {
    this.deviceTramoService.getCoveragesByTramos()
      .subscribe(res => {
        this._coverages = res;
        // Agregar tramos a las areas de cobertura.
        // @ts-ignore
        this._coverages.forEach(item => {
          this.deviceTramoService.getTramosByCoverage(item._id)
            .subscribe(res => item.tramos = res);
        });
      });
  }

  // Lista de roles.
  get roles() {
    return this.authService.roles;
  }

  // Rol del usuario autentificado.
  get currentRole() {
    return this._currentRole;
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
  get devices(): Array<Device> | undefined {
    return this._devices;
  }

  // Id del tramo actual.
  get currentTramoId(): string {
    return this._currentTramoId;
  }

  // Lista de areas cobertura.
  get coveragesList(): Array<Coverage> | undefined {
    return this._coveragesList;
  }

  // Lista de tramos.
  get tramosList(): Array<Tramo> | undefined {
    return this._tramosList;
  }

  // Lista de torres.
  get towersList(): Array<Tower> | undefined {
    return this._towersList;
  }

  // actualizar el id del tramo actual.
  setCurrentTramoId(id: string): void {
    this._currentTramoId = id;
  }

  // reiniciar valores por defecto del equipo.
  setDefaultDeviceEmpty(): void {
    this._currentDevice = DeviceListService.defaultDeviceEmpty();
  }

  // Obtener equipos por tramo.
  getDevicesByTramo(id: string): void {
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

  // cargar el equipo actual.
  getDevice(id: string): void {
    this.deviceService.getDevice(id)
      .subscribe(res => this._currentDevice = res);
  }

  // registrar equipo.
  addDevice(device: Device): void {
    this.deviceService.create(device).subscribe(() => {
      this.getDevicesByTramo(this._currentTramoId);
    });
  }

  // actualizar equipo.
  updateDevice(device: Device): void {
    this.deviceService.update(device).subscribe(() => {
      this.getDevicesByTramo(this._currentTramoId);
    });
  }

  // borrar equipo.
  deleteDevice(id: string): void {
    this.deviceService.delete(id).subscribe(() => {
      this.getDevicesByTramo(this._currentTramoId);
      Swal.fire(
        'Borrado!',
        'El registro ha sido borrado.',
        'success'
      );
    });
  }

}

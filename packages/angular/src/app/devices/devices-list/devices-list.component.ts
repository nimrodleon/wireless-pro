import {Component, OnInit} from '@angular/core';

declare var jQuery: any;
import Swal from 'sweetalert2';
import {TramoService} from '../tramo.service';
import {Tramo} from '../tramo.model';
import {Device} from '../device.model';
import {DeviceService} from '../device.service';
import {Coverage} from 'src/app/client/coverage.model';
import {CoverageService} from 'src/app/client/coverage.service';
import {AuthService} from '../../user/auth.service';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss']
})
export class DevicesListComponent implements OnInit {
  optionSearch: string = 'T0';
  idTreeObj: string = '';
  tramos: Array<Tramo>;
  // Areas cobertura.
  coverages: Array<Coverage>;
  // equipo actual.
  currentDevice: Device;
  // lista de equipos.
  devices: Array<Device>;
  // titúlo modal equipos.
  titleModal: string;
  // Permisos para Administrar el módulo.
  isRedes: boolean = false;

  constructor(private tramoService: TramoService,
              private coverageService: CoverageService, private deviceService: DeviceService,
              private authService: AuthService) {
    this.coverages = new Array<Coverage>();
    this.currentDevice = new Device();
    this.devices = new Array<Device>();
  }

  ngOnInit(): void {
    this.getCoverages();
    jQuery(() => {
      jQuery('[data-toggle="tooltip"]').tooltip();
    });
    // test ping.
    // this.ping("http://angular.io")
    //   .then(delta => {
    //     console.log('Ping time was ' + delta + ' ms');
    //   })
    //   .catch(error => {
    //     console.error('Could not ping remote URL', error);
    //   });
    const body = document.querySelector('body');
    body.addEventListener('keydown', e => {
      if (e.key == 'F7') {
        const trArr = document.querySelectorAll('tr');
        Array.from(trArr).forEach(tr =>
          tr.classList.remove('text-success', 'text-danger'));
      }
      if (e.key == 'F8') {
        this.onPing();
      }
    });
    // Cargar Permisos del Módulo.
    this.authService.isRedes().subscribe(res => this.isRedes = res);
  }

  private request_image(url) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => {
        resolve(img);
      };
      img.onerror = () => {
        reject(url);
      };
      img.src = url + '?random-no-cache=' + Math.floor((1 + Math.random()) * 0x10000).toString(16);
    });
  }

  private ping(url) {
    return new Promise((resolve, reject) => {
      let start = (new Date()).getTime();
      let response = () => {
        let delta = ((new Date()).getTime() - start);
        delta = delta * 1;
        resolve(delta);
      };
      this.request_image(url).then(response).catch(response);
      // Set a timeout for max-pings, 1s.
      setTimeout(() => {
        reject(Error('Timeout'));
      }, 1000);
    });
  }

  // Lista de coberturas.
  private getCoverages(): void {
    this.coverageService.getCoverages()
      .subscribe(res => this.coverages = res);
  }

  addDevice(): void {
    if (!this.isRedes) {
      Swal.fire(
        'Oops...',
        'Necesitas permisos para esta Operación!',
        'error'
      );
    } else {
      this.titleModal = 'Agregar Equipo';
      this.currentDevice = new Device();
      jQuery('#app-device-modal').modal('show');
    }
  }

  // Cambia el filtro (torre/tramo).
  optSearch(opt: string): void {
    this.optionSearch = opt;
  }

  // Listar equipos.
  getDevices(id: string): void {
    const old = document.getElementById(this.idTreeObj);
    if (old) {
      old.classList.remove('font-weight-bold', 'text-success');
    }
    // Cambiar css elemento activo.
    const el = document.getElementById(id);
    if (el) {
      el.classList.add('font-weight-bold', 'text-success');
    }
    // Cargar equipos en la tabla.
    this.idTreeObj = id;
    this.deviceService.getDevices(this.idTreeObj, this.optionSearch)
      .subscribe(res => this.devices = res);
  }

  // guardar equipos.
  saveChanges(device: Device): void {
    if (device._id === undefined) {
      this.deviceService.create(device).subscribe(res => {
        this.getDevices(this.idTreeObj);
      });
    } else {
      this.deviceService.update(device).subscribe(res => {
        this.getDevices(this.idTreeObj);
      });
    }
  }

  editDevice(id: string): void {
    if (!this.isRedes) {
      Swal.fire(
        'Oops...',
        'Necesitas permisos para esta Operación!',
        'error'
      );
    } else {
      this.titleModal = 'Editar Equipo';
      this.deviceService.getDevice(id).subscribe(res => {
        this.currentDevice = res;
        jQuery('#app-device-modal').modal('show');
      });
    }
  }

  deleteDevice(id: string): void {
    if (!this.isRedes) {
      Swal.fire(
        'Oops...',
        'Necesitas permisos para esta Operación!',
        'error'
      );
    } else {
      Swal.fire({
        title: 'Seguro de borrar este equipo?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, bórralo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deviceService.delete(id).subscribe(res => {
            this.getDevices(this.idTreeObj);
            Swal.fire(
              'Borrado!',
              'El equipo ha sido borrado.',
              'success'
            );
          });
        }
      });
    }
  }

  // boton para hacer ping.
  onPing(): void {
    if (this.devices.length > 0) {
      this.devices.forEach(item => {
        const _item = item;
        this.ping('http://' + _item.ipAddress)
          .then(delta => {
            const dom = document.getElementById(_item._id);
            if (dom) {
              dom.classList.add('text-success');
            }
          })
          .catch(err => {
            const dom = document.getElementById(_item._id);
            if (dom) {
              dom.classList.add('text-danger');
            }
          });
      });
    }
  }

}

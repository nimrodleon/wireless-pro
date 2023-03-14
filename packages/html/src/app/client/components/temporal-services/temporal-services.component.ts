import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {BitWorkerService, ServicePlanService} from 'src/app/system/services';
import {ClientService, ServiceService} from '../../services';
import {Sweetalert2} from 'src/app/global/interfaces';
import {AuthService} from 'src/app/user/services';

@Component({
  selector: 'app-temporal-services',
  templateUrl: './temporal-services.component.html'
})
export class TemporalServicesComponent implements OnInit {
  servicesList: any;
  currentRole: string = '';
  @Output()
  hideModal = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private serviceService: ServiceService,
    private servicePlanService: ServicePlanService,
    private clientService: ClientService,
    private bitWorkerService: BitWorkerService) {
  }

  ngOnInit(): void {
    // cargar servicios temporales.
    this.serviceService.getTemporalServices()
      .subscribe(result => this.servicesList = result);
    // obtener rol del usuario autentificado.
    this.authService.getRoles().subscribe((result: string) => this.currentRole = result);
  }

  // Lista de permisos.
  get roles() {
    return this.authService.roles;
  }

  // cargar detalle del servicio.
  async loadDetailService(event: any, serviceId: string) {
    event.preventDefault();
    this.hideModal.emit(true);
    await this.router.navigate(['/client/service-detail', serviceId]);
  }

  // corregir servicio temporal.
  // @ts-ignore
  async corregirClick(serviceId: string) {
    if (this.currentRole !== this.roles.ROLE_CASH) {
      return Sweetalert2.accessDeniedGeneric();
    }
    const {value: option} = await Swal.fire({
      title: 'CORREGIR SERVICIO TEMPORAL',
      input: 'select',
      inputOptions: {
        'OPT1': 'HABILITAR SERVICIO',
        'OPT2': 'SUSPENDER SERVICIO',
      },
      inputPlaceholder: 'Seleccione una opción',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    });

    if (option && option === 'OPT1') {
      // habilitar servicio.
      this.enableService(serviceId);
    }
    if (option && option === 'OPT2') {
      // suspender servicio.
      this.suspendService(serviceId);
    }
  }

  // habilitar servicio.
  private enableService(serviceId: string): void {
    this.bitWorkerService.changeStatusService(serviceId, 'N01')
      .subscribe(async (result) => {
        if (!result.ok) {
          await Sweetalert2.errorMessage();
        } else {
          this.serviceService.getTemporalServices()
            .subscribe(result => this.servicesList = result);
        }
      });
  }

  // suspender servicio.
  private suspendService(serviceId: string): void {
    this.bitWorkerService.changeStatusService(serviceId, 'N03')
      .subscribe(async (result) => {
        if (!result.ok) {
          await Sweetalert2.errorMessage();
        } else {
          this.serviceService.getTemporalServices()
            .subscribe(result => this.servicesList = result);
        }
      });
  }

}

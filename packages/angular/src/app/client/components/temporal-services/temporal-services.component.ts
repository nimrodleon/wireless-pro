import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import Swal from 'sweetalert2';
import {BitWorkerService, ServicePlanService} from 'src/app/system/services';
import {ClientService, ServiceService} from '../../services';
import {Sweetalert2} from 'src/app/global/interfaces';
import {AuthService} from 'src/app/user/services';
import {Service} from '../../interfaces';

@Component({
  selector: 'app-temporal-services',
  templateUrl: './temporal-services.component.html',
  styleUrls: ['./temporal-services.component.scss']
})
export class TemporalServicesComponent implements OnInit {
  servicesList: any;
  currentRole: string;
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
    this.authService.getRoles().subscribe(result => this.currentRole = result);
  }

  // Lista de permisos.
  get roles() {
    return this.authService.roles;
  }

  // cargar detalle del servicio.
  loadDetailService(event: any, serviceId: string): void {
    event.preventDefault();
    this.hideModal.emit(true);
    this.router.navigate(['/client/service-detail', serviceId])
      .then(() => {
        console.log('Hide Temporal Service.');
      });
  }

  // valores del registro arp.
  private getArpValues(interfaceId: string, service: Service, disabled: string): Observable<any> {
    let subject = new Subject<any>();
    this.bitWorkerService.getInterfaceNameById(interfaceId)
      .subscribe(interfaceName => {
        this.clientService.getClientById(service.clientId)
          .subscribe(client => {
            subject.next({
              address: service.ipAddress,
              macAddress: service.macAddress,
              interface: interfaceName,
              comment: client.fullName,
              disabled: disabled,
              mikrotikId: service.mikrotikId,
              serviceId: service._id
            });
          });
      });
    return subject.asObservable();
  }

  // valores del registro simpleQueue.
  private getSimpleQueueValues(service: Service, disabled: string): Observable<any> {
    let subject = new Subject<any>();
    this.clientService.getClientById(service.clientId)
      .subscribe(client => {
        this.servicePlanService.getServicePlan(service.servicePlanId)
          .subscribe(result => {
            subject.next({
              name: service._id,
              target: service.ipAddress,
              maxLimit: `${result.uploadSpeed}/${result.downloadSpeed}`,
              limitAt: '0/0',
              comment: client.fullName,
              disabled: disabled,
              mikrotikId: service.mikrotikId,
              serviceId: service._id
            });
          });
      });
    return subject.asObservable();
  }

  // corregir servicio temporal.
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
    this.serviceService.getServiceById(serviceId)
      .subscribe(result => {
        let {mikrotikId, interfaceId} = result;
        this.bitWorkerService.getSimpleQueueById(mikrotikId, serviceId)
          .subscribe(async (data) => {
            if (!data.ok) {
              await Sweetalert2.errorMessage();
            } else {
              if (!interfaceId) return Sweetalert2.errorMessage();
              this.getArpValues(interfaceId, result, 'no')
                .subscribe(arpData => {
                  this.bitWorkerService.updateArpList(serviceId, arpData)
                    .subscribe(() => {
                      this.getSimpleQueueValues(result, 'no')
                        .subscribe(simpleData => {
                          this.bitWorkerService.updateSimpleQueue(serviceId, simpleData)
                            .subscribe(() => {
                              Sweetalert2.messageSuccess();
                              this.bitWorkerService.createWorkerActivity({
                                serviceId: serviceId,
                                task: 'HABILITAR SERVICIO',
                                typeOperation: 'OPT1',
                                remark: '-'
                              }).subscribe(() => {
                                this.serviceService.getTemporalServices()
                                  .subscribe(result => this.servicesList = result);
                              });
                              this.serviceService.changeStatusService(serviceId, 'HABILITADO')
                                .subscribe(() => {
                                  console.log('Enabled services');
                                });
                            });
                        });
                    });
                });
            }
          });
      });
  }

  // suspender servicio.
  private suspendService(serviceId: string): void {
    this.serviceService.getServiceById(serviceId)
      .subscribe(result => {
        let {mikrotikId, interfaceId} = result;
        this.bitWorkerService.getSimpleQueueById(mikrotikId, serviceId)
          .subscribe(async (data) => {
            if (!data.ok) {
              await Sweetalert2.errorMessage();
            } else {
              if (!interfaceId) return Sweetalert2.errorMessage();
              this.getArpValues(interfaceId, result, 'yes')
                .subscribe(arpData => {
                  this.bitWorkerService.updateArpList(serviceId, arpData)
                    .subscribe(() => {
                      this.getSimpleQueueValues(result, 'yes')
                        .subscribe(simpleData => {
                          this.bitWorkerService.updateSimpleQueue(serviceId, simpleData)
                            .subscribe(() => {
                              Sweetalert2.messageSuccess();
                              this.bitWorkerService.createWorkerActivity({
                                serviceId: serviceId,
                                task: 'SUSPENDER SERVICIO',
                                typeOperation: 'OPT2',
                                remark: '-'
                              }).subscribe(() => {
                                this.serviceService.getTemporalServices()
                                  .subscribe(result => this.servicesList = result);
                              });
                              this.serviceService.changeStatusService(serviceId, 'SUSPENDIDO')
                                .subscribe(() => {
                                  console.log('Suspended services');
                                });
                            });
                        });
                    });
                });
            }
          });
      });
  }

}

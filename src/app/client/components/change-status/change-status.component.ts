import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl} from "@angular/forms";
import {Observable, Subject} from "rxjs";
import * as moment from "moment";
import Swal from "sweetalert2";
import {Sweetalert2} from "src/app/global/interfaces";
import {BitWorkerService, ServicePlanService} from "src/app/system/services";
import {ServiceDetailService} from "../../services";
import {AuthService} from "src/app/user/services";

@Component({
  selector: "app-change-status",
  templateUrl: "./change-status.component.html"
})
export class ChangeStatusComponent implements OnInit {
  workerActivityList: Array<any> = new Array<any>();
  workerActivityYear: FormControl = this.fb.control(moment().format("YYYY"));
  currentRole: string = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private bitWorkerService: BitWorkerService,
    private servicePlanService: ServicePlanService,
    private serviceDetailService: ServiceDetailService) {
  }

  ngOnInit(): void {
    // carga el rol actual del usuario.
    this.authService.getRoles().subscribe((result: string) => this.currentRole = result);
    // lista de actividades del mikrotik.
    this.getWorkerActivityListClick();
  }

  // id del servicio actual.
  get serviceId() {
    return this.serviceDetailService.serviceId;
  }

  // lista de roles.
  get roles() {
    return this.authService.roles;
  }

  public checkRolAdmin(): boolean {
    return this.currentRole === this.roles.admin;
  }

  public checkRolAdminOrRedes(): boolean {
    return this.currentRole === this.roles.admin
      || this.currentRole === this.roles.redes;
  }

  public checkRolAdminOrCajero(): boolean {
    return this.currentRole === this.roles.admin
      || this.currentRole === this.roles.cajero;
  }

  // botón cargar lista estado de cambios.
  getWorkerActivityListClick(): void {
    this.getWorkerActivityList(this.serviceId, this.workerActivityYear.value);
  }

  // Lista de estado de cambios.
  private getWorkerActivityList(serviceId: string, year: string): void {
    this.bitWorkerService.getWorkerActivities(serviceId, year).subscribe(result => {
      this.workerActivityList = result;
    });
  }

  // valores planes de servicio.
  private getServicePlan(): Observable<any> {
    let subject = new Subject<any>();
    this.servicePlanService.getServicePlans()
      .subscribe(result => {
        let data = {};
        Array.from(result).forEach(item => {
          // @ts-ignore
          data[item._id] = item.name;
        });
        subject.next(data);
      });
    return subject.asObservable();
  }

  // cambiar estado del servicio.
  private changeStatusService(option: string): void {
    this.bitWorkerService.changeStatusService(this.serviceId, option)
      .subscribe(async (result) => {
        if (!result.ok) {
          await Sweetalert2.errorMessage();
        } else {
          this.getWorkerActivityListClick();
          this.serviceDetailService.getCurrentService(this.serviceId)
            .subscribe(result => console.log(result));
          await Sweetalert2.messageSuccess();
        }
      });
  }

  // Habilitar servicio.
  enableServiceInBitWorker(event: any): void {
    event.preventDefault();
    this.authService.isRolAdminOrCajero()
      .subscribe(async (result) => {
        if (!result) {
          await Sweetalert2.accessDeniedGeneric();
        } else {
          const {value: option} = await Swal.fire({
            title: "HABILITAR SERVICIO",
            input: "select",
            inputOptions: {
              "HST": "HABILITAR SERVICIO TEMPORAL",
              "N01": "ACTIVACIÓN POR REGISTRO DE PAGO",
              "N02": "ACTIVACIÓN A SOLICITUD DEL CLIENTE",
            },
            inputPlaceholder: "Seleccione una opción",
            showCancelButton: true,
            cancelButtonText: "Cancelar"
          });
          if (option) {
            this.changeStatusService(option);
          }
        }
      });
  }

  // Suspender servicio.
  suspendServiceInBitWorker(event: any): void {
    event.preventDefault();
    this.authService.isRolAdminOrCajero()
      .subscribe(async (result) => {
        if (!result) {
          await Sweetalert2.accessDeniedGeneric();
        } else {
          const {value: option} = await Swal.fire({
            title: "SUSPENSIÓN DE SERVICIO",
            input: "select",
            inputOptions: {
              "N03": "CORTE POR FALTA DE PAGO",
              "N04": "SUSPENSIÓN A SOLICITUD DEL CLIENTE"
            },
            inputPlaceholder: "Seleccione una opción",
            showCancelButton: true,
            cancelButtonText: "Cancelar"
          });
          if (option) {
            this.changeStatusService(option);
          }
        }
      });
  }

  // Cambiar plan de servicio.
  async changeServicePlanInBitWorker(event: any) {
    event.preventDefault();
    this.authService.isRolAdminOrCajero()
      .subscribe(async (result) => {
        if (!result) {
          await Sweetalert2.accessDeniedGeneric();
        } else {
          this.getServicePlan()
            .subscribe(async (result) => {
              const {value: tarifa} = await Swal.fire({
                title: "PLANES DE SERVICIO",
                input: "select",
                inputOptions: {...result},
                inputPlaceholder: "Seleccione una opción",
                showCancelButton: true,
                cancelButtonText: "Cancelar"
              });
              if (tarifa) {
                this.bitWorkerService.changeServicePlan(this.serviceId, tarifa)
                  .subscribe(async (result) => {
                    if (!result.ok) {
                      await Sweetalert2.errorMessage();
                    } else {
                      this.getWorkerActivityListClick();
                      this.serviceDetailService.getCurrentService(this.serviceId)
                        .subscribe(result => console.info(result));
                      await Sweetalert2.messageSuccess();
                    }
                  });
              }
            });
        }
      });
  }

  // Registrar servicio.
  registerServiceInBitWorker(event: any): void {
    event.preventDefault();
    this.authService.isRolAdminOrRedes()
      .subscribe(async (result) => {
        if (!result) {
          await Sweetalert2.accessDeniedGeneric();
        } else {
          Sweetalert2.messageConfirm().then(result => {
            if (result.isConfirmed) {
              this.bitWorkerService.addService(this.serviceId)
                .subscribe(async (result) => {
                  if (!result.ok) {
                    await Sweetalert2.errorMessage();
                  } else {
                    this.getWorkerActivityListClick();
                    await Sweetalert2.messageSuccess();
                  }
                });
            }
          });
        }
      });
  }

  // Actualizar servicio.
  updateServiceInBitWorker(event: any): void {
    event.preventDefault();
    this.authService.isRolAdminOrRedes()
      .subscribe(async (result) => {
        if (!result) {
          await Sweetalert2.accessDeniedGeneric();
        } else {
          Sweetalert2.messageConfirm().then(result => {
            if (result.isConfirmed) {
              this.bitWorkerService.updateService(this.serviceId)
                .subscribe(async (result) => {
                  if (!result.ok) {
                    await Sweetalert2.errorMessage();
                  } else {
                    this.getWorkerActivityListClick();
                    await Sweetalert2.messageSuccess();
                  }
                });
            }
          });
        }
      });
  }

  // Borrar servicio.
  deleteServiceInBitWorker(event: any): void {
    event.preventDefault();
    this.authService.isRolAdminOrRedes()
      .subscribe(async (result) => {
        if (!result) {
          await Sweetalert2.accessDeniedGeneric();
        } else {
          Sweetalert2.deleteConfirm().then(result => {
            if (result.isConfirmed) {
              this.bitWorkerService.deleteService(this.serviceId)
                .subscribe(async (result) => {
                  if (!result.ok) {
                    await Sweetalert2.errorMessage();
                  } else {
                    this.getWorkerActivityListClick();
                    await Sweetalert2.deleteSuccess();
                  }
                });
            }
          });
        }
      });
  }

}

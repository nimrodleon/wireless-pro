import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

declare var bootstrap: any;
import {AuthService} from 'src/app/user/services';
import {Sweetalert2} from 'src/app/global/interfaces';
import {ServiceDetailService} from '../../services';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {
  titleService: string = '';
  serviceModal: any;
  // ============================================================

  // ============================================================

  // ============================================================
  currentRole: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private serviceDetailService: ServiceDetailService,
    private authService: AuthService,) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.serviceDetailService.getCurrentService(params.get('id'))
        .subscribe(result => console.log(result));
      //  this.serviceDetailService.getAveriaList(params.get('id'), this.averiaYearInput.value);
      // this.serviceDetailService.getPaymentList(params.get('id'), this.paymentYearInput.value);
      // this.getWorkerActivityList(params.get('id'), this.workerActivityYear.value);
    });
    // vincular modal servicios.
    this.serviceModal = new bootstrap.Modal(
      document.querySelector('#service-modal'));
    // Obtener rol del usuario autentificado.
    this.authService.getRoles().subscribe((result: string) => this.currentRole = result);
  }

  // Lista de permisos.
  get roles() {
    return this.authService.roles;
  }

  // servicio actual.
  get currentService() {
    return this.serviceDetailService.currentService;
  }

  // cliente actual.
  get currentClient() {
    return this.serviceDetailService.currentClient;
  }

  // plan de servicio actual.
  get currentServicePlan() {
    return this.serviceDetailService.currentServicePlan;
  }

  // averia actual.
  get currentAveria() {
    return this.serviceDetailService.currentAveria;
  }

  // lista de averias.
  get paymentList() {
    return this.serviceDetailService.paymentList;
  }

  // editar servicio modal.
  async editServiceModal() {
    if (this.currentRole !== this.roles.ROLE_NETWORK) {
      await Sweetalert2.accessDeniedGeneric();
    } else {
      this.titleService = 'Editar Servicio';
      this.serviceDetailService.getCurrentService(this.currentService._id)
        .subscribe(() => {
          this.serviceModal.show();
        });
    }
  }

  // borrar servicio actual.
  async deleteServiceClick(event: any) {
    event.preventDefault();
    if (this.currentRole !== this.roles.ROLE_ADMIN) {
      await Sweetalert2.accessDenied();
    } else {
      Sweetalert2.deleteConfirm().then(result => {
        if (result.isConfirmed) {
          this.serviceDetailService.deleteService(this.currentService._id);
        }
      });
    }
  }

  // cerrar modal servicios.
  hideServiceModal(value: boolean): void {
    if (value === true) {
      this.serviceDetailService.getCurrentService(this.currentService._id)
        .subscribe(() => this.serviceModal.hide());
    }
  }

  // // Swal modal detalle del servicio actual.
  // async detailServiceClick(event: any) {
  //   event.preventDefault();
  //   const content: string = `
  //     <tr>
  //       <th>Dirección IP</th>
  //       <th>Dirección MAC</th>
  //     </tr>
  //     <tr>
  //       <td>${this.currentService.ipAddress}</td>
  //       <td>${this.currentService.macAddress}</td>
  //     </tr>
  //     <tr>
  //       <th>Precio definido</th>
  //       <th>Estado</th>
  //     </tr>
  //     <tr>
  //       <td>${this.currentService.defPrice ?
  //     '<i class="fas fa-check-circle text-success"></i>'
  //     : '<i class="fas fa-times-circle text-danger"></i>'}
  //       </td>
  //       <td>${this.currentService.status}</td>
  //     </tr>
  //     <tr>
  //       <th>Tipo</th>
  //       <th>Precio Mensual</th>
  //     </tr>
  //     <tr>
  //       <td>${this.currentService.paymentType}</td>
  //       <td>${this.currentService.price}</td>
  //     </tr>
  //     <tr>
  //       <td colspan="2">${this.currentService.paymentNote}</td>
  //     </tr>
  //   `;
  //   return Swal.fire({
  //     title: '<strong>DETALLE DEL SERVICIO</strong>',
  //     html: `<table class="table mb-0"><tbody>${content}</tbody></table>`
  //   });
  // }

}

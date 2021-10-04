import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

declare var bootstrap: any;
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

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private serviceDetailService: ServiceDetailService,) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.serviceDetailService.serviceId = params.get('id') || '';
      this.serviceDetailService.getCurrentService(params.get('id')).subscribe(result => console.log(result));
    });
    // vincular modal servicios.
    this.serviceModal = new bootstrap.Modal(document.querySelector('#service-modal'));
  }

  // id del servicio actual.
  get serviceId() {
    return this.serviceDetailService.serviceId;
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

  // ====================================================================================================

  get roleIsAdmin() {
    return this.serviceDetailService.roleIsAdmin;
  }

  get roleIsNetwork() {
    return this.serviceDetailService.roleIsNetwork;
  }

  // ====================================================================================================

  // editar servicio modal.
  public async editServiceModal() {
    this.roleIsNetwork.subscribe(result => {
      if (!result) {
        Sweetalert2.accessDeniedGeneric();
      } else {
        this.titleService = 'Editar Servicio';
        this.serviceDetailService.getCurrentService(this.serviceId)
          .subscribe(() => {
            this.serviceModal.show();
          });
      }
    });
  }

  // borrar servicio actual.
  public async deleteServiceClick(event: any) {
    event.preventDefault();
    this.roleIsAdmin.subscribe(result => {
      if (!result) {
        Sweetalert2.accessDenied();
      } else {
        Sweetalert2.deleteConfirm().then(result => {
          if (result.isConfirmed) {
            this.serviceDetailService.deleteService(this.serviceId)
              .subscribe(result => {
                if (result) {
                  this.router.navigate(['/client/detail', this.currentService.clientId]);
                }
              });
          }
        });
      }
    });
  }

  // cerrar modal servicios.
  public hideServiceModal(value: boolean): void {
    if (value) {
      this.serviceDetailService.getCurrentService(this.serviceId)
        .subscribe(() => this.serviceModal.hide());
    }
  }

}

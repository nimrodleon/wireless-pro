import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import * as moment from 'moment';

declare var bootstrap: any;
import {Client, Service} from '../../interfaces';
import {ClientService, ServiceDetailService, ServiceService} from '../../services';
import {Sweetalert2} from '../../../global/interfaces';
import {Averia} from '../../../averia/interfaces/averia';
import {AveriaService} from '../../../averia/services/averia.service';
import {AuthService} from '../../../user/services';

@Component({
  selector: 'app-averia-detail',
  templateUrl: './averia-detail.component.html',
  styleUrls: ['./averia-detail.component.scss']
})
export class AveriaDetailComponent implements OnInit {
  @Input()
  currentService: Service;
  @Input()
  currentClient: Client;
  @Input()
  currentAveria: Averia;
  averiaYearInput: FormControl = this.fb.control(moment().format('YYYY'));
  titleAveria: string = '';
  averiaModal: any;
  attendAveriaModal: any;
  currentRole: string = '';

  constructor(
    private fb: FormBuilder,
    private serviceDetailService: ServiceDetailService,
    private serviceService: ServiceService,
    private clientService: ClientService,
    private averiaService: AveriaService,
    private authService: AuthService,) {
    this.currentService = this.serviceService.defaultValues();
    this.currentClient = this.clientService.defaultValues();
    this.currentAveria = this.averiaService.defaultValues();
  }

  ngOnInit(): void {
    // Obtener rol del usuario autentificado.
    this.authService.getRoles().subscribe((result: string) => this.currentRole = result);
    // vincular modal averia.
    this.averiaModal = new bootstrap.Modal(
      document.querySelector('#app-averia-modal'));
    // vincular modal atender averia.
    this.attendAveriaModal = new bootstrap.Modal(
      document.querySelector('#app-averia-attend'));
  }

  // Lista de permisos.
  get roles() {
    return this.authService.roles;
  }

  // // Lista de averias.
  // get averiaList() {
  //   return this.serviceDetailService.averiaList;
  // }
  //
  // // cargar lista de averias.
  // averiaListLoad(): void {
  //   this.serviceDetailService.getAveriaList(this.currentService._id, this.averiaYearInput.value);
  // }
  //
  // // agregar averia.
  // addAveriaClick(): void {
  //   this.titleAveria = 'Agregar Averia';
  //   this.serviceDetailService.setDefaultValueAveria();
  //   this.averiaModal.show();
  // }
  //
  // // editar averia.
  // editAveriaClick(id: string): void {
  //   this.titleAveria = 'Editar Averia';
  //   this.serviceDetailService.getAveriaById(id);
  //   this.averiaModal.show();
  // }
  //
  // // atender averia.
  // attendAveriaClick(id: string): void {
  //   this.serviceDetailService.getAveriaById(id);
  //   this.attendAveriaModal.show();
  // }
  //
  // // guardar cambios averia.
  // async saveChangeAveria(data: any) {
  //   if (data._id === undefined) {
  //     // registrar averia.
  //     data.client = this.currentClient._id;
  //     data.serviceId = this.currentService._id;
  //     await this.serviceDetailService.createAveria(data);
  //     this.averiaModal.hide();
  //     this.averiaListLoad();
  //   } else {
  //     // actualizar averia.
  //     await this.serviceDetailService.updateAveria(data);
  //     this.averiaModal.hide();
  //     this.attendAveriaModal.hide();
  //     this.averiaListLoad();
  //   }
  // }
  //
  // // borrar averia.
  // async deleteAveriaClick(id: string) {
  //   if (this.currentRole !== this.roles.ROLE_ADMIN) {
  //     await Sweetalert2.accessDenied();
  //   } else {
  //     Sweetalert2.deleteConfirm().then(result => {
  //       if (result.isConfirmed) {
  //         this.serviceDetailService.deleteAveria(id).subscribe(() => {
  //           this.averiaListLoad();
  //           Sweetalert2.deleteSuccess();
  //         });
  //       }
  //     });
  //   }
  // }

}

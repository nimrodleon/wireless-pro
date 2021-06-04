import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import {ClientService} from '../client.service';
import {PaymentService} from '../payment.service';
import {ServiceService} from '../service.service';
import {AuthService} from 'src/app/user/services/auth.service';
import {Service} from '../service.model';
import {Client} from '../client.model';
import {Payment} from '../payment.model';
import {Outage} from '../outage.model';
import {OutagesService} from '../outages.service';

declare var jQuery: any;

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {
  isAdmin: boolean;

  constructor(private clientService: ClientService, private router: Router,
              private serviceService: ServiceService, private paymentService: PaymentService,
              private activatedRoute: ActivatedRoute, private authService: AuthService,
              private outageService: OutagesService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.clientId = params.get('id');
      if (this.clientId) {
        this.getClient(this.clientId);
      }
    });
    this.getServices(this.clientId);
    this.authService.isAdmin().subscribe(res => this.isAdmin = res);
  }

  //# SERVICE COMPONENT SECTION
  titleServiceModal: string = '';
  service: Service = new Service();
  serviceList: any[];
  expectedPayment: number = 0.00;

  // Open modal Service.
  addServices(): void {
    this.titleServiceModal = 'Agregar Servicio';
    this.service = new Service();
    jQuery('#app-add-client-service').modal('show');
  }

  // Open modal Service edit.
  onEditService(service: any): void {
    this.titleServiceModal = 'Editar Servicio';
    this.serviceService.getService(service._id).subscribe(res => {
      this.service = res;
      jQuery('#app-add-client-service').modal('show');
    });
  }

  // Update Service.
  setService(service: Service): void {
    if (!service.servicePlan) {
      Swal.fire('Seleccione un Servicio de la Lista!');
    } else {
      if (service._id === undefined) {
        this.serviceService.create(service).subscribe(res => {
          this.getServices(this.clientId);
        });
      } else {
        this.serviceService.update(service).subscribe(res => {
          this.getServices(this.clientId);
        });
      }
    }
  }

  /**
   * Carga los Servicios
   * si el registro fue eliminado.
   * @param status Estado
   */
  deleteService(status: boolean): void {
    if (status) {
      this.getServices(this.clientId);
    }
  }

  /**
   * Load Services.
   * @param id ClientId
   */
  loadServices(id: string): void {
    this.getServices(id);
  }

  /**
   * get services list.
   * @param id ClientId
   * @private
   */
  private getServices(id: string): void {
    this.serviceService.getServices(id).subscribe(res => {
      this.calcExpectedPayment(res);
      this.serviceList = res;
    });
  }

  /**
   * Calcula el pago esperado.
   * @param serviceList Array de servicios
   */
  private calcExpectedPayment(serviceList: any[]): void {
    this.expectedPayment = 0.00;
    serviceList.forEach(service => {
      this.expectedPayment += service.servicePlan.priceMonthly;
    });
  }

  //# END SERVICE COMPONENT

  //# CLIENT COMPONENT SECTION
  client: Client = new Client();
  private clientId: string = '';
  titleModal: string = 'Editar Cliente';
  editMode: boolean = true;

  /**
   * Actualiza el registro del cliente.
   * @param client Cliente
   */
  setClient(client: Client): void {
    this.clientService.update(client).subscribe(res => {
      this.client = res;
    });
  }

  onDeleteClient(): void {
    if (this.client) {
      Swal.fire({
        title: `¿Estás seguro de borrar?`,
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, bórralo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.clientService.delete(this.client._id).subscribe(res => {
            Swal.fire(
              'Eliminado!',
              'El Cliente a sido eliminado.',
              'success'
            );
            this.router.navigate(['/client/list']);
          });
        }
      });
    }
  }

  /**
   * Optiene el registro del cliente.
   * @param id clave
   */
  private getClient(id: string): void {
    this.clientService.getClient(id).subscribe(client => {
      this.client = client;
    });
  }

  //# END CLIENT COMPONENT

  //# PAYMENT MODAL SECTION
  titlePaymentModal: string;
  payment: Payment = new Payment();
  printReceipt: boolean = false;
  currentService: any = {};

  addPayment(): void {
    // check that you have permissions.
    this.authService.isCaja()
      .subscribe(res => {
        if (!res) {
          Swal.fire(
            'Oops...',
            'Necesitas permisos para esta Operación!',
            'error'
          );
        } else {
          // ensure that there is at least one service.
          if (this.serviceList.length <= 0) {
            Swal.fire(
              'Oops...',
              'Agrega al menos un Servicio!',
              'error'
            );
          } else {
            this.currentService = this.serviceList[0];
            this.titlePaymentModal = 'Agregar Pago';
            this.payment = new Payment();
            this.payment.year = new Date().getFullYear().toString();
            jQuery('#app-payment-modal').modal('show');
          }
        }
      });
  }

  // register payment.
  setPayment(payment: Payment): void {
    if (payment._id === undefined) {
      this.paymentService.create(payment).subscribe(res => {
        this.payment = res;
        if (this.payment) {
          if (this.printReceipt === true) {
            this.router.navigate(['/ticket', this.payment._id]);
          } else {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Comprobante de pago registrado!',
              showConfirmButton: false,
              timer: 1500
            });
          }
        }
      });
    }
  }

  // print receipt.
  setPrintReceipt(print: boolean): void {
    this.printReceipt = print;
  }

  /**
   * Enable Service.
   * @param id serviceId
   */
  // enableService(id: string): void {
  //   if (id.length > 0) {
  //     let outage = new Outage();
  //     outage.service = id;
  //     outage.description = 'Habilitado desde Registro de Pagos!';
  //     outage.status = 'A';
  //     outage.createdAt = moment().format('YYYY-MM-DD');
  //     this.outageService.create(outage)
  //       .subscribe(res => {
  //         outage = res; // update outage var.
  //         this.serviceService.getService(res.service)
  //           .subscribe(res => {
  //             res.isActive = true;
  //             res.dateFrom = outage.createdAt;
  //             res.lastOutage = outage._id;
  //             this.serviceService.update(res)
  //               .subscribe(res => this.getServices(res.client));
  //           });
  //       });
  //   }
  // }

  //# END PAYMENT MODAL

}

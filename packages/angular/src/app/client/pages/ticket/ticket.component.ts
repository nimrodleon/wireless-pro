import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Client, Payment, Service} from '../../interfaces';
import {ClientService, PaymentService, ServiceService} from '../../services';
import {ServicePlan, Info} from '../../../system/interfaces';
import {ServicePlanService, InfoService} from '../../../system/services';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  info: Info;
  client: Client;
  payment: Payment;
  service: Service;
  servicePlan: ServicePlan;
  currentDate: Date = new Date();

  constructor(private paymentService: PaymentService,
              private router: Router, private activatedRoute: ActivatedRoute,
              private clientService: ClientService, private serviceService: ServiceService,
              private infoService: InfoService, private servicePlanService: ServicePlanService) {
    this.payment = this.paymentService.defaultValues();
    this.service = this.serviceService.defaultValues();
  }

  ngOnInit(): void {
    this.infoService.getInfo().subscribe(res => this.info = res);
    this.activatedRoute.paramMap.subscribe(params => {
      this.getPayment(params.get('id'));
    });
  }

  // Carga el Cliente del Comprobante.
  private getClient(id: string): void {
    this.clientService.getClientById(id).subscribe(res => {
      this.client = res;
    });
  }

  // Obtiene el Comprobante de Pago.
  private getPayment(id: string): void {
    this.paymentService.getPaymentById(id).subscribe(res => {
      this.payment = res;
      this.getClient(res.clientId);
      this.getService(res.serviceId);
    });
  }

  // Obtiene El Servicio Prestado.
  private getService(id: string): void {
    this.serviceService.getServiceById(id).subscribe(res => {
      this.service = res;
      this.getServicePlan(res.servicePlanId);
    });
  }

  // Obtiene el Plan de Servicio.
  private getServicePlan(id: string): void {
    this.servicePlanService.getServicePlan(id).subscribe(res => this.servicePlan = res);
  }

  print() {
    window.print();
  }

}

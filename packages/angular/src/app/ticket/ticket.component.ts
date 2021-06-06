import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from '../client/interfaces/client';
import { ClientService } from '../client/services/client.service';
import { Payment } from '../client/interfaces/payment';
import { PaymentService } from '../client/services/payment.service';
import { ServicePlan } from '../client/interfaces/service-plan';
import { ServicePlanService } from '../client/services/service-plan.service';
import { Service } from '../client/interfaces/service';
import { ServiceService } from '../client/services/service.service';
import { Info } from '../system/interfaces/info';
import { InfoService } from '../system/services/info.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  info: Info = new Info();
  client: Client = new Client();
  payment: Payment = new Payment();
  service: Service = new Service();
  servicePlan: ServicePlan = new ServicePlan();
  currentDate: Date = new Date();

  constructor(private paymentService: PaymentService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private clientService: ClientService, private serviceService: ServiceService,
    private infoService: InfoService, private servicePlanService: ServicePlanService) { }

  ngOnInit(): void {
    this.infoService.getInfo().subscribe(res => this.info = res);
    this.activatedRoute.paramMap.subscribe(params => {
      this.getPayment(params.get('id'));
    });
  }

  // Carga el Cliente del Comprobante.
  private getClient(id: string): void {
    this.clientService.getClient(id).subscribe(res => {
      this.client = res;
    });
  }

  // Obtiene el Comprobante de Pago.
  private getPayment(id: string): void {
    this.paymentService.getPayment(id).subscribe(res => {
      this.payment = res;
      this.getClient(res.client);
      this.getService(res.service);
    });
  }

  // Obtiene El Servicio Prestado.
  private getService(id: string): void {
    this.serviceService.getService(id).subscribe(res => {
      this.service = res;
      this.getServicePlan(res.servicePlan);
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

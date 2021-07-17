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
  payment: Payment;
  client: Client;
  servicePlan: ServicePlan;
  currentDate: Date = new Date();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private infoService: InfoService,
    private paymentService: PaymentService,
    private clientService: ClientService,
    private serviceService: ServiceService,
    private servicePlanService: ServicePlanService) {
    this.info = this.infoService.defaultValues();
    this.payment = this.paymentService.defaultValues();
    this.client = this.clientService.defaultValues();
    this.servicePlan = this.servicePlanService.defaultValues();
  }

  ngOnInit(): void {
    this.infoService.getInfo().subscribe(res => this.info = res);
    this.activatedRoute.paramMap.subscribe(params => {
      this.paymentService.getPaymentById(params.get('id')).subscribe(result => {
        this.payment = result;
        this.clientService.getClientById(result.clientId).subscribe(result => this.client = result);
        this.serviceService.getServiceById(result.serviceId).subscribe(result => {
          this.servicePlanService.getServicePlan(result.servicePlanId).subscribe(result => this.servicePlan = result);
        });
      });
    });
  }

  print() {
    window.print();
  }

}

import {Component, OnInit} from '@html/core';
import {ActivatedRoute} from '@html/router';
import {InfoService, ServicePlanService} from 'src/app/system/services';
import {WorkOrderService} from '../../services';
import {Info, ServicePlan} from 'src/app/system/interfaces';
import {WorkOrder} from '../../interfaces';
import {Client} from '../../../client/interfaces';
import {ClientService} from '../../../client/services';

@Component({
  selector: 'app-work-ticket',
  templateUrl: './work-ticket.component.html',
  styleUrls: ['./work-ticket.component.scss']
})
export class WorkTicketComponent implements OnInit {
  info: Info;
  workOrder: WorkOrder;
  servicePlan: ServicePlan;
  client: Client;

  constructor(
    private activatedRoute: ActivatedRoute,
    private infoService: InfoService,
    private workOrderService: WorkOrderService,
    private servicePlanService: ServicePlanService,
    private clientService: ClientService) {
    // Valores por defecto.
    this.info = this.infoService.defaultValues();
    this.workOrder = this.workOrderService.defaultValues();
    this.servicePlan = this.servicePlanService.defaultValues();
    this.client = this.clientService.defaultValues();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.workOrderService.getWorkOrderById(params.get('id'))
        .subscribe(result => {
          this.workOrder = result;
          this.servicePlanService.getServicePlan(result.servicePlanId)
            .subscribe(result => this.servicePlan = result);
          this.clientService.getClientById(result.clientId)
            .subscribe(result => this.client = result);
        });
    });
    // Información empresa.
    this.infoService.getInfo()
      .subscribe(result => this.info = result);
  }

  // Imprimir ventana.
  print(): void {
    window.print();
  }

}

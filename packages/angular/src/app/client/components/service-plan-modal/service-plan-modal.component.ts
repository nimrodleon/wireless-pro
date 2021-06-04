import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServicePlan } from '../../interfaces/service-plan';
declare var jQuery: any;

@Component({
  selector: 'app-service-plan-modal',
  templateUrl: './service-plan-modal.component.html',
  styleUrls: ['./service-plan-modal.component.scss']
})
export class ServicePlanModalComponent implements OnInit {
  @Input() title: string;
  @Input() servicePlan: ServicePlan;
  @Output() sendServicePlan = new EventEmitter<ServicePlan>();

  constructor() { }

  ngOnInit(): void {
  }

  saveChanges(): void {
    this.sendServicePlan.emit(this.servicePlan);
    jQuery('#app-service-plan-modal').modal('hide');
  }

}

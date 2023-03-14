import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServicePlan} from '../../interfaces';
import {ServicePlanService} from '../../services';

declare var jQuery: any;

@Component({
  selector: 'app-service-plan-modal',
  templateUrl: './service-plan-modal.component.html',
  styleUrls: ['./service-plan-modal.component.scss']
})
export class ServicePlanModalComponent implements OnInit {
  @Input() title: string = '';
  @Input() servicePlan: ServicePlan;
  @Output() sendServicePlan = new EventEmitter<ServicePlan>();

  constructor(private servicePlanService: ServicePlanService) {
    this.servicePlan = this.servicePlanService.defaultValues();
  }

  ngOnInit(): void {
  }

  saveChanges(): void {
    this.sendServicePlan.emit(this.servicePlan);
    jQuery('#app-service-plan-modal').modal('hide');
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {ServicePlanService} from '../../services';
import {ServicePlan} from '../../interfaces';

@Component({
  selector: 'app-service-plan-badge',
  templateUrl: './service-plan-badge.component.html'
})
export class ServicePlanBadgeComponent implements OnInit {
  @Input()
  servicePlan: ServicePlan;
  enabled: string = '0';
  suspended: string = '0';

  constructor(private servicePlanService: ServicePlanService) {
    this.servicePlan = this.servicePlanService.defaultValues();
  }

  ngOnInit(): void {
    this.servicePlanService.totalStatusServices(this.servicePlan._id)
      .subscribe(result => {
        this.enabled = result.enabled;
        this.suspended = result.suspended;
      });
  }

}

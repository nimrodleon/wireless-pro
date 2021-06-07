import {Component, OnInit} from '@angular/core';

declare var Chart: any;
import {CoverageService} from '../../system/services/coverage.service';
import {ServicePlanService} from '../../system/services/service-plan.service';

@Component({
  selector: 'app-total-clients',
  templateUrl: './total-clients.component.html',
  styleUrls: ['./total-clients.component.scss']
})
export class TotalClientsComponent implements OnInit {
  option: string = 'A';

  constructor(private coverageService: CoverageService,
              private servicePlanService: ServicePlanService) {
  }

  ngOnInit(): void {
    this.onLoadReport();
  }

  private totalCoverages(): void {
    this.coverageService.totalClients()
      .subscribe(res => {
        console.log(res);
        let labels: Array<any> = new Array<any>();
        let dataArr: Array<any> = new Array<any>();
        Array.from(res).forEach(value => {
          labels.push(value['name']);
          dataArr.push(value['count']);
        });
        let ctx = document.getElementById('myChart1');
        let myChart1 = new Chart(ctx, {
          type: 'horizontalBar',
          data: {
            labels: labels,
            datasets: [{
              label: '# de Clientes',
              data: dataArr,
              backgroundColor: 'rgba(75, 119, 169, 1)',
            }]
          }
        });
      });
  }

  private totalServicePlans(): void {
    this.servicePlanService.totalClients()
      .subscribe(res => {
        console.log(res);
        let labels: Array<any> = new Array<any>();
        let dataArr: Array<any> = new Array<any>();
        Array.from(res).forEach(value => {
          labels.push(value['name']);
          dataArr.push(value['count']);
        });
        let ctx = document.getElementById('myChart2');
        let myChart2 = new Chart(ctx, {
          type: 'horizontalBar',
          data: {
            labels: labels,
            datasets: [{
              label: '# de Equipos',
              data: dataArr,
              backgroundColor: 'rgba(75, 119, 169, 1)',
            }]
          }
        });
      });
  }

  onLoadReport() {
    if (this.option == 'A') {
      this.totalCoverages();
    }
    if (this.option == 'B') {
      this.totalServicePlans();
    }
  }

}

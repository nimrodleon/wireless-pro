import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-active-clients',
  templateUrl: './active-clients.component.html',
  styleUrls: ['./active-clients.component.scss']
})
export class ActiveClientsComponent implements OnInit {
  clients: any[];
  arrLength: number = 0;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.reportService.getActiveClients().subscribe(res => {
      this.clients = res;
      this.arrLength = res.length;
    });
  }

}

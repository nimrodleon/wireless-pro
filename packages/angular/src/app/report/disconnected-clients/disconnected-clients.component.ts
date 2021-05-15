import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/client/client.model';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-disconnected-clients',
  templateUrl: './disconnected-clients.component.html',
  styleUrls: ['./disconnected-clients.component.scss']
})
export class DisconnectedClientsComponent implements OnInit {
  clients: Client[];
  arrLength: number;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.reportService.getClientsDisconnected().subscribe(res => {
      this.clients = res;
      this.arrLength = res.length;
    });
  }

}

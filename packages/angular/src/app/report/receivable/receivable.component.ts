import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-receivable',
  templateUrl: './receivable.component.html',
  styleUrls: ['./receivable.component.scss']
})
export class ReceivableComponent implements OnInit {
  services: any[];
  date: string = '';
  total: number = 0;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
  }

  onSearch(): void {
    if (!this.date) {
      Swal.fire('Seleccione una Fecha!');
    } else {
      this.reportService.getReceivables(this.date).subscribe(res => {
        this.services = res;
        this.total = res.length;
        console.log(this.services);
      });
    }
  }

}

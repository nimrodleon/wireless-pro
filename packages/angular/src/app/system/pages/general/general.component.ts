import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {InfoService} from '../../services';
import {Info} from '../../interfaces';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  info: Info = {
    _id: '',
    ruc: '',
    company: '',
    fullAddress: '',
    phone: '',
    legendTicket: '',
  };

  constructor(private infoService: InfoService) {
  }

  ngOnInit(): void {
    this.getInfo();
  }

  private getInfo(): void {
    this.infoService.getInfo().subscribe(res => {
      this.info = res;
    });
  }

  update(): void {
    this.infoService.update(this.info).subscribe(res => {
      this.info = res;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Actualización correcta!',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

}

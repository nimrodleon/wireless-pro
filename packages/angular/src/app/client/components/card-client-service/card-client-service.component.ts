import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import * as ClipboardJS from 'clipboard';
import {ServiceService, OutagesService} from '../../services';
import {Outage, Service} from '../../interfaces';

@Component({
  selector: 'app-card-client-service',
  templateUrl: './card-client-service.component.html',
  styleUrls: ['./card-client-service.component.scss']
})
export class CardClientServiceComponent implements OnInit {
  @Input()
  currentService: Service;
  @Output()
  sendIdService = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
    new ClipboardJS('[data-clipboard-text]');
  }

  // retornar estado del servicio.
  getStatusText(value: string): string {
    switch (value) {
      case 'H':
        return 'HABILITADO';
      case 'D':
        return 'DESHABILITADO';
      case 'N':
        return 'NOTIFICADO';
      case 'S':
        return 'SUSPENDIDO';
    }
  }

  // editar servicio.
  editServiceClick(): void {
    this.sendIdService.emit(this.currentService._id);
  }

  // /**
  //  * Enable or Suspended Service.
  //  * @param status
  //  */
  // onChangeStatus(status: boolean): void {
  //   this.serviceService.getServiceById(this.service._id)
  //     .subscribe(async res => {
  //       let objTmp = res;
  //       const {value: text} = await Swal.fire({
  //         input: 'textarea',
  //         inputPlaceholder: 'Escribe una descripción aquí...',
  //         inputAttributes: {
  //           'aria-label': 'Type your message here'
  //         },
  //         showCancelButton: true
  //       });
  //
  //       if (text) {
  //         // objTmp.isActive = status;
  //         if (status) {
  //           // objTmp.dateFrom = moment().format('YYYY-MM-DD');
  //         } else {
  //           // objTmp.closeDate = moment().format('YYYY-MM-DD');
  //         }
  //         // create outage.
  //         let outage = new Outage();
  //         outage.service = objTmp._id;
  //         outage.description = text.toString();
  //         outage.status = status ? 'A' : 'S';
  //         outage.createdAt = moment().format('YYYY-MM-DD');
  //         this.outageService.create(outage).subscribe(res => {
  //           // Update Service document.
  //           // objTmp.lastOutage = res._id;
  //           // this.serviceService.updateService(objTmp).subscribe(() => {
  //           //   this.sendLoadServices.emit(objTmp.client);
  //           // });
  //         });
  //       }
  //     });
  // }

}

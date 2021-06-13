import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import * as ClipboardJS from 'clipboard';
import {ServiceService, OutagesService} from '../../services';
import {Outage} from '../../interfaces';

@Component({
  selector: 'app-card-client-service',
  templateUrl: './card-client-service.component.html',
  styleUrls: ['./card-client-service.component.scss']
})
export class CardClientServiceComponent implements OnInit {
  @Input()
  service: any;

  // send service list.
  @Output()
  sendServiceList = new EventEmitter<any>();

  // send service.
  @Output()
  sendLoadServices = new EventEmitter<string>();

  constructor(private serviceService: ServiceService,
              private outageService: OutagesService) {
  }

  ngOnInit(): void {
    new ClipboardJS('[data-clipboard-text]');
  }

  onEdit(): void {
    this.sendServiceList.emit(this.service);
  }

  /**
   * Enable or Suspended Service.
   * @param status
   */
  onChangeStatus(status: boolean): void {
    this.serviceService.getService(this.service._id)
      .subscribe(async res => {
        let objTmp = res;
        const {value: text} = await Swal.fire({
          input: 'textarea',
          inputPlaceholder: 'Escribe una descripción aquí...',
          inputAttributes: {
            'aria-label': 'Type your message here'
          },
          showCancelButton: true
        });

        if (text) {
          objTmp.isActive = status;
          if (status) {
            objTmp.dateFrom = moment().format('YYYY-MM-DD');
          } else {
            objTmp.closeDate = moment().format('YYYY-MM-DD');
          }
          // create outage.
          let outage = new Outage();
          outage.service = objTmp._id;
          outage.description = text.toString();
          outage.status = status ? 'A' : 'S';
          outage.createdAt = moment().format('YYYY-MM-DD');
          this.outageService.create(outage).subscribe(res => {
            // Update Service document.
            objTmp.lastOutage = res._id;
            this.serviceService.update(objTmp).subscribe(() => {
              this.sendLoadServices.emit(objTmp.client);
            });
          });
        }
      });
  }

}

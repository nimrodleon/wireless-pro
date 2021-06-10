import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

declare var jQuery: any;
import Swal from 'sweetalert2';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';
import {Averia} from '../../interfaces/averia';
import {AveriaService} from '../../services/averia.service';

@Component({
  selector: 'app-averia-modal',
  templateUrl: './averia-modal.component.html',
  styleUrls: ['./averia-modal.component.scss']
})
export class AveriaModalComponent implements OnInit {
  private baseURL: string = environment.baseUrl + 'clients';

  @Input()
  title: string;

  @Input()
  averia: Averia;

  @Output()
  sendModel = new EventEmitter<Averia>();

  constructor(private averiaService: AveriaService) {
  }

  ngOnInit(): void {
    jQuery('#app-averia-modal').on('shown.bs.modal', () => {
      jQuery('select[name="clientId"]').select2({
        theme: 'bootstrap4',
        dropdownParent: jQuery('#app-averia-modal'),
        ajax: {
          url: this.baseURL + '/select2/s',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }
      });
      // Preselecting options in an remotely-sourced.
      if (!this.averia._id) {
        jQuery('select[name="clientId').val(null).trigger('change');
      } else {
        this.averiaService.getAveria(this.averia._id).subscribe(res => {
          const option = new Option(res.client.fullName, res.client._id, true, true);
          jQuery('select[name="clientId').append(option).trigger('change');
        });
      }
    });
  }

  saveChanges(): void {
    this.averia.client = jQuery('select[name="clientId"]').val();
    if (this.averia._id === undefined) {
      this.averia.createdAt = moment().format('YYYY-MM-DD, hh:mm:ss A');
      this.averia.year = moment().format('YYYY');
      this.averia.month = moment().format('MM');
      this.averia.day = moment().format('DD');
    }
    if (this.averia.client === null) {
      Swal.fire('Seleccione un cliente!');
    } else {
      this.sendModel.emit(this.averia);
      jQuery('#app-averia-modal').modal('hide');
    }
  }

}

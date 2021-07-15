import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';
import * as moment from 'moment';
import Swal from 'sweetalert2';

declare var jQuery: any;
import {environment} from 'src/environments/environment';
import {Averia} from '../../interfaces/averia';
import {AveriaService} from '../../services/averia.service';

@Component({
  selector: 'app-averia-modal',
  templateUrl: './averia-modal.component.html',
  styleUrls: ['./averia-modal.component.scss']
})
export class AveriaModalComponent implements OnInit {
  // private baseURL: string = environment.baseUrl + 'clients';
  @Input()
  title: string;
  @Input()
  averia: Averia;
  @Output()
  sendModel = new EventEmitter<Averia>();
  // ============================================================
  averiaForm: FormGroup = this.averiaService.formGroup();

  constructor(
    private averiaService: AveriaService) {
  }

  ngOnInit(): void {
    this.averiaForm.valueChanges
      .subscribe(value => this.averia = value);
    // eventos del formulario modal.
    let myModal = document.querySelector('#app-averia-modal');
    myModal.addEventListener('shown.bs.modal', () => {
      // cargar valores al formulario.
      this.averiaForm.reset({...this.averia});
      // configurar select2 para buscar clientes.
      // jQuery('select[name="clientId"]').select2({
      //   theme: 'bootstrap-5',
      //   dropdownParent: jQuery('#app-averia-modal'),
      //   ajax: {
      //     url: this.baseURL + '/select2/s',
      //     headers: {
      //       Authorization: 'Bearer ' + localStorage.getItem('token')
      //     }
      //   }
      // }).on('select2:select', (e) => {
      //   let {data} = e.params;
      //   this.averia.client = data.id;
      //   this.averiaForm.setValue(this.averia);
      // });
      // Preselecting options in an remotely-sourced.
      // if (!this.averia._id) {
      //   jQuery('select[name="clientId').val(null).trigger('change');
      // } else {
      //   this.averiaService.getClientById(this.averia.client)
      //     .subscribe(result => {
      //       const option = new Option(result.fullName, result._id, true, true);
      //       jQuery('select[name="clientId').append(option).trigger('change');
      //     });
      // }
    });
    // myModal.addEventListener('hidden.bs.modal', () => {
    //   this.averiaForm.reset({...this.averiaService.defaultValues()});
    // });
  }

  // guardar cambios.
  saveChanges(): void {
    if (this.averia._id === null) {
      delete this.averia._id;
      this.averia.archived = false;
      this.averia.status = 'P';
      this.averia.createdAt = moment().format('YYYY-MM-DD, hh:mm:ss A');
      this.averia.year = moment().format('YYYY');
      this.averia.month = moment().format('MM');
      this.averia.day = moment().format('DD');
    }
    if (this.averia.client === null) {
      Swal.fire('Seleccione un cliente!')
        .then(() => console.info('Seleccionar cliente!'));
    } else {
      this.sendModel.emit(this.averia);
      // jQuery('#app-averia-modal').modal('hide');
    }
  }

}

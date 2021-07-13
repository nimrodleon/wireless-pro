import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

declare var jQuery: any;
import {Averia} from '../../interfaces/averia';
import {UserService} from 'src/app/user/services/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {AveriaService} from '../../services/averia.service';

@Component({
  selector: 'app-averia-attend',
  templateUrl: './averia-attend.component.html',
  styleUrls: ['./averia-attend.component.scss']
})
export class AveriaAttendComponent implements OnInit {
  @Input()
  averia: Averia;
  @Output()
  sendModel = new EventEmitter<Averia>();
  users: any;
  // ============================================================
  averiaForm: FormGroup = this.averiaService.formGroup();

  constructor(
    private userService: UserService,
    private averiaService: AveriaService) {
  }

  ngOnInit(): void {
    this.averiaForm.valueChanges
      .subscribe(value => this.averia = value);
    // eventos del modal atender averia.
    let myModal = document.querySelector('#app-averia-attend');
    myModal.addEventListener('shown.bs.modal', () => {
      // cargar datos al formulario.
      this.averiaForm.reset({...this.averia});
      // cargar lista de usuarios.
      this.userService.getUsersWithSelect2('')
        .subscribe(res => this.users = res.results);
    });
  }

  saveChanges(): void {
    this.sendModel.emit(this.averia);
    jQuery('#app-averia-attend').modal('hide');
  }

}

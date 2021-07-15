import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Averia} from '../../interfaces/averia';
import {AveriaService} from '../../services/averia.service';

@Component({
  selector: 'app-averia-modal',
  templateUrl: './averia-modal.component.html',
  styleUrls: ['./averia-modal.component.scss']
})
export class AveriaModalComponent implements OnInit {
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
    });
  }

  // guardar cambios.
  saveChanges(): void {
    if (this.averia._id === null) {
      delete this.averia._id;
      delete this.averia.year;
      delete this.averia.createdAt;
      delete this.averia.user;
    }
    this.sendModel.emit(this.averia);
  }

}

import {Component, OnInit} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';
import {Info} from '../../interfaces';
import {InfoService} from '../../services';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  info: Info;
  Editor = ClassicEditor;

  constructor(
    private infoService: InfoService) {
    this.info = this.infoService.defaultValues();
  }

  ngOnInit(): void {
    this.getInfo();
  }

  // Obtener info.
  private getInfo(): void {
    this.infoService.getInfo().subscribe(res => {
      this.info = res;
    });
  }

  // actualizar info.
  updateInfo(): void {
    this.infoService.update(this.info)
      .subscribe(res => {
        this.info = res;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Actualización correcta!'
        });
      });
  }

}

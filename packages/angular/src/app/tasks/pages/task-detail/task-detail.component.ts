import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

declare var jQuery: any;
import Swal from 'sweetalert2';
import {TaskService} from '../../services/task.service';
import {Task} from '../../interfaces/task';
import {TaskMaterial} from '../../interfaces/task-material';
import {AuthService} from '../../../user/services/auth.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task: any;
  taskMaterials: Array<any>;
  private idTask: string;
  // Permissions to manage this module.
  // TODO: borrar esta linea al refactorizar el código.
  isAdmin: boolean = false;

  constructor(private taskService: TaskService, private authService: AuthService,
              private ActivatedRoute: ActivatedRoute) {
    this.task = new Task();
    this.taskMaterials = new Array<any>();
  }

  ngOnInit(): void {
    this.ActivatedRoute.paramMap.subscribe(params => {
      this.idTask = params.get('id');
      this.getTask(this.idTask);
      this.getTaskMaterials(this.idTask);
    });
  }

  /*ngAfterViewInit(): void {
    jQuery('select[name="arrUser[]"]').select2()
      .on('select2:select select2:unselect', (e) => {
        const items = jQuery('select[name="arrUser[]').select2('data');
        let arrId: Array<string> = new Array<string>();
        console.log(items);
        Array.from(items).forEach(value => {
          // @ts-ignore
          arrId.push(value.id);
        });
        // save users.
        console.log(arrId);
      });
  }*/

  private getTask(id: string): void {
    this.taskService.getTask(id).subscribe(res => this.task = res);
  }

  private getTaskMaterials(id: string): void {
    this.taskService.getTaskMaterials(id).subscribe(res => this.taskMaterials = res);
  }

  addMaterial(): void {
    jQuery('#app-add-material').modal('show');
  }

  saveChanges(taskMaterial: TaskMaterial): void {
    console.log(taskMaterial);
    taskMaterial.task = this.task._id;
    this.taskService.createMaterial(taskMaterial).subscribe(res => {
      this.getTaskMaterials(this.idTask);
    });
  }

  editMaterial(onSave: boolean): void {
    if (onSave == true) {
      this.getTaskMaterials(this.idTask);
    }
  }

  // Eliminar Material de Tarea.
  deleteMaterial(event: any, id: string): void {
    event.preventDefault();
    Swal.fire({
      title: 'Seguro de borrar?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.taskService.deleteMaterial(id).subscribe(res => {
          this.getTaskMaterials(this.idTask);
          Swal.fire(
            'Borrado!',
            'El material ha sido borrado.',
            'success'
          );
        });
      }
    });
  }

  // Abrir modal Agregar Técnico.
  addUserTech(): void {
    jQuery('#app-add-user').modal('show');
  }

  // Guardar Técnico en la base de datos.
  setUserTech(userId: string): void {
    this.task.user = userId;
    this.task.status = 'P';
    this.taskService.update(this.task).subscribe(res => {
      this.getTask(this.idTask);
      // Refresh Location.
      // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      //   this.router.navigate(['/task-detail/', this.idTask]).then(e => {
      //   });
      // });
    });
  }

  // Delete User and Status.
  newStatusChangeTask(e: any): void {
    e.preventDefault();
    this.task.status = 'N';
    this.taskService.update(this.task).subscribe(res => this.task = res);
  }

  finishTask(): void {
    Swal.fire({
      title: 'Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Finalizar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.task.status = 'F';
        this.taskService.update(this.task).subscribe(res => this.getTask(this.idTask));
      }
    });
  }

  // Enable Task.
  enableTask(): void {
    this.task.status = 'P';
    this.taskService.update(this.task).subscribe(res => this.getTask(this.idTask));
  }

  printPage(e): void {
    e.preventDefault();
    window.print();
  }

  // Total Materials.
  getTotal(): number {
    let total: number = 0;
    Array.from(this.taskMaterials).forEach(value => {
      total += value.total;
    });
    return total;
  }

}

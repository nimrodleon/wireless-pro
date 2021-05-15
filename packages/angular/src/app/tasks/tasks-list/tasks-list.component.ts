import {Component, OnInit} from '@angular/core';

declare var jQuery: any;
import Swal from 'sweetalert2';
import {TaskService} from '../task.service';
import {Task} from '../task.model';
import {AuthService} from '../../user/auth.service';


@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  query: string = '';
  statusTask: string = 'N';
  tasks: Array<any> = new Array<any>();
  titleModal: string = '';
  currentTask: Task;
  // Permissions to manage this module.
  isAdmin: boolean = false;

  constructor(private taskService: TaskService,
              private authService: AuthService) {
    this.currentTask = new Task();
  }

  ngOnInit(): void {
    jQuery(() => {
      jQuery('[data-toggle="tooltip"]').tooltip();
    });
    this.getTasks();
    this.authService.isAdmin()
      .subscribe(res => this.isAdmin = res);
  }

  private getTasks(): void {
    this.taskService.getTasks(this.statusTask, this.query)
      .subscribe(res => this.tasks = res);
  }

  // Cambia el estado del checkbox.
  chkOnChange(checked: boolean): void {
    this.statusTask = checked ? 'F' : 'N';
  }

  // Buscador de tareas.
  onSearch(): void {
    this.getTasks();
  }

  // Guardar cambios.
  saveChanges(task: Task): void {
    if (task._id === undefined) {
      this.taskService.create(task).subscribe(res => this.getTasks());
    } else {
      this.taskService.update(task).subscribe(res => this.getTasks());
    }
  }

  // Nueva tarea.
  addTask(): void {
    this.titleModal = 'Agregar Tarea';
    this.currentTask = new Task();
    jQuery('#app-task-modal').modal('show');
  }

  editTask(id: string): void {
    this.titleModal = 'Editar Tarea';
    this.taskService.getTask(id).subscribe(res => {
      this.currentTask = res;
      jQuery('#app-task-modal').modal('show');
    });
  }

  deleteTask(id: string): void {
    if (!this.isAdmin) {
      Swal.fire(
        'Oops...',
        'Necesitas permisos para esta Operación!',
        'error'
      );
    } else {
      Swal.fire({
        title: 'Seguro de borrar esta Tarea?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, bórralo!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
          this.taskService.delete(id).subscribe(res => {
            this.getTasks();
            Swal.fire(
              'Borrado!',
              'La Tarea ha sido borrado.',
              'success'
            );
          });
        }
      });
    }
  }

}

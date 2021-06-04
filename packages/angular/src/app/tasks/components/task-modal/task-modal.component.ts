import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// Local Imports.
declare var jQuery: any;
import * as moment from 'moment';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements OnInit {
  @Input() title;
  @Input() task: Task;
  @Output() sendModel = new EventEmitter<Task>();

  constructor() { }

  ngOnInit(): void {
  }

  saveChanges(): void {
    if (this.task._id === undefined) {
      this.task.status = 'N';
      this.task.createdAt = moment().format('YYYY-MM-DD');
    }
    this.sendModel.emit(this.task);
    jQuery('#app-task-modal').modal('hide');
  }

}

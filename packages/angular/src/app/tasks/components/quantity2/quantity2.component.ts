import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TaskMaterial} from '../../interfaces/task-material';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-quantity2',
  templateUrl: './quantity2.component.html',
  styleUrls: ['./quantity2.component.scss']
})
export class Quantity2Component implements OnInit {
  editMode: boolean = false;

  @Input()
  statusTask: string;

  @Input()
  taskMaterial: TaskMaterial;

  @Output()
  sendOnSave = new EventEmitter<boolean>();

  constructor(private taskService: TaskService) {
    this.taskMaterial = new TaskMaterial();
  }

  ngOnInit(): void {
  }

  onEdit(event: any): void {
    event.preventDefault();
    this.editMode = true;
  }

  onSave(event: any): void {
    event.preventDefault();
    this.taskMaterial.difference = this.taskMaterial.quantity1 - this.taskMaterial.quantity2;
    this.taskMaterial.total = this.taskMaterial.quantity2 * this.taskMaterial.price;
    this.taskService.updateMaterial(this.taskMaterial).subscribe(res => {
      this.sendOnSave.emit(true);
      this.editMode = false;
    });
  }

}

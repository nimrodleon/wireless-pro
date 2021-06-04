import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskMaterial} from '../../interfaces/task-material';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {
  editMode: boolean = false;

  @Input()
  statusTask: string;

  @Input()
  taskMaterial: TaskMaterial;

  @Output()
  sendOnSave = new EventEmitter<boolean>();

  constructor(private  taskService: TaskService) {
    this.taskMaterial = new TaskMaterial();
  }

  ngOnInit(): void {
  }

  edit(e): void {
    e.preventDefault();
    this.editMode = true;
  }

  saveChange(e): void {
    e.preventDefault();
    this.taskMaterial.total = this.taskMaterial.quantity2 * this.taskMaterial.price;
    this.taskService.updateMaterial(this.taskMaterial).subscribe(() => {
      this.sendOnSave.emit(true);
      this.editMode = false;
    });
  }

}

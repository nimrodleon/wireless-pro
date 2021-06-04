import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-material-out',
  templateUrl: './material-out.component.html',
  styleUrls: ['./material-out.component.scss']
})
export class MaterialOutComponent implements OnInit {
  year: string;
  month: string;
  search: string = '';
  tasks: Array<any> = new Array<any>();

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.year = moment().format('YYYY');
    this.month = moment().format('MM');
    this.getTasks();
  }

  onSearch(): void {
    this.getTasks();
    console.log(this.year, this.month, this.search);
  }

  private getTasks(): void {
    this.taskService.getTasks2(this.year, this.month, this.search).subscribe(res => this.tasks = res);
  }

}

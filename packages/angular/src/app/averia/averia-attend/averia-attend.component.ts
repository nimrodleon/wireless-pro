import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

declare var jQuery: any;
import {Averia} from '../averia.model';
import {User} from 'src/app/user/interfaces/user';
import {UserService} from 'src/app/user/services/user.service';

@Component({
  selector: 'app-averia-attend',
  templateUrl: './averia-attend.component.html',
  styleUrls: ['./averia-attend.component.scss']
})
export class AveriaAttendComponent implements OnInit {
  @Input() averia: Averia;
  @Output() sendModel = new EventEmitter<Averia>();
  users: Array<User> = new Array<User>();

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    jQuery('#app-averia-attend').on('shown.bs.modal', () => {
      this.userService.getUsers(false)
        .subscribe(res => this.users = res);
    });
  }

  saveChanges(): void {
    this.sendModel.emit(this.averia);
    jQuery('#app-averia-attend').modal('hide');
  }

}

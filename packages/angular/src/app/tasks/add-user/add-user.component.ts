import {Component, OnInit, Output, EventEmitter} from '@angular/core';

declare var jQuery: any;
import {User} from 'src/app/user/interfaces/user';
import {UserService} from 'src/app/user/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  users: Array<User>;
  userId: string;

  @Output()
  sendUserId = new EventEmitter<string>();

  constructor(private userService: UserService) {
    this.users = new Array<User>();
  }

  ngOnInit(): void {
    jQuery('#app-add-user').on('show.bs.modal', (event) => {
      this.userService.getUsers(false)
        .subscribe(res => this.users = res);
      this.userId = '';
    });
  }

  saveChanges(): void {
    this.sendUserId.emit(this.userId);
    jQuery('#app-add-user').modal('hide');
  }

}

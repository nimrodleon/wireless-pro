import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../user/services/user.service';
import {FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userList: any;
  userId: FormControl = this.fb.control('');

  constructor(
    private fb: FormBuilder,
    private userService: UserService) {
  }

  ngOnInit(): void {
    // cargar lista de usuarios.
    this.userService.getUsersWithSelect2('')
      .subscribe(result => this.userList = result);
  }

  // seleccionar usuario.
  selectUserClick(): void {
    this.userService.getUser(this.userId.value)
      .subscribe(result => {
        console.log(result);
      });
  }

}

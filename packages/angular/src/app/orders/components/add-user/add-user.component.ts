import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {UserService} from '../../../user/services';
import {FormBuilder, FormControl} from '@angular/forms';
import {InstallationOrderDetailService} from '../../services';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userList: any;
  userId: FormControl = this.fb.control('');
  @Output()
  closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private installationOrderDetailService: InstallationOrderDetailService) {
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
        this.installationOrderDetailService.setUserTechnical(result);
        this.installationOrderDetailService.updateInstallationOrder();
        this.closeModal.emit(true);
      });
  }

}

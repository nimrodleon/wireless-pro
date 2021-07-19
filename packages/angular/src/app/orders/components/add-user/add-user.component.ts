import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {UserService} from 'src/app/user/services';
import {InstallationOrderDetailService} from '../../services';
import {Select2} from 'src/app/global/interfaces';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userList: Select2 = {results: []};
  userId: FormControl = this.fb.control('');
  @Output()
  hideModal = new EventEmitter<boolean>();

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
    this.userService.getUserById(this.userId.value)
      .subscribe(result => {
        this.installationOrderDetailService.setUserTechnical(result);
        this.installationOrderDetailService.updateInstallationOrder();
        this.hideModal.emit(true);
      });
  }

}

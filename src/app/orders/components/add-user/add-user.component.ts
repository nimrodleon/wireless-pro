import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl} from '@angular/forms';
import {UserService} from 'src/app/user/services';
import {WorkOrderDetailService} from '../../services';
import {Select2} from 'src/app/global/interfaces';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit {
  userList: Select2 = {results: []};
  userId: UntypedFormControl = this.fb.control('');
  @Output()
  hideModal = new EventEmitter<boolean>();

  constructor(
    private fb: UntypedFormBuilder,
    private userService: UserService,
    private workOrderDetailService: WorkOrderDetailService) {
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
        this.workOrderDetailService.setUserTechnical(result);
        this.workOrderDetailService.updateWorkOrder();
        this.hideModal.emit(true);
      });
  }

}

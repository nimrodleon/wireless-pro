import {Component, EventEmitter, Input, Output} from '@angular/core';

import {User} from '../../interfaces';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent {
  @Input()
  title: string;
  @Input()
  user: User;
  @Input()
  editMode: boolean;
  @Output()
  sendModel = new EventEmitter<User>();

  constructor() {
  }

  // Suspender usuarios.
  onSuspended(checked: boolean): void {
    this.user.suspended = checked;
  }

  // Guardar datos.
  saveChanges(): void {
    this.sendModel.emit(this.user);
  }


}

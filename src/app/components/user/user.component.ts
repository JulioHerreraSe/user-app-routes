import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'user',
  imports: [],
  templateUrl: './user.component.html'
})
export class UserComponent {

  title: string = 'Listado de usuarios';

  @Input() users: User[] = [];

  @Output() idUserEventEmitter = new EventEmitter();

  @Output() selectedUserEventEmitter = new EventEmitter();

  onRemoveUser(id: number): void {
    this.idUserEventEmitter.emit(id);
  }

  onSelectedUser(user: User): void {
    this.selectedUserEventEmitter.emit(user);
  }
}

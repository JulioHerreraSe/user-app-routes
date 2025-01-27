import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'form-user',
  imports: [FormsModule],
  templateUrl: './form-user.component.html'
})
export class FormUserComponent {

  @Input() user: User;

  @Input() open: boolean = false;

  @Output() newUserEventEmitter: EventEmitter<User> = new EventEmitter();

  @Output() openEventEmitter = new EventEmitter();

  constructor() {
    this.user = new User();
  }

  onSubmit(userForm: NgForm): void {
    if(userForm.valid) {
      this.newUserEventEmitter.emit(this.user);
      console.log(this.user);
    }
    this.onClear(userForm);
  }

  onClear(userForm: NgForm): void {
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
  }

  onOpenClose(): void {
    this.openEventEmitter.emit();
  }
}

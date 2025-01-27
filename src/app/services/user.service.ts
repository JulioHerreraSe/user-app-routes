import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [{
    id: 1,
    name: 'Julio',
    lastname: 'Herrera',
    email: 'julio@mail.com',
    username: 'julio',
    password: '123456'
  },
  {
    id: 2,
    name: 'Pepe',
    lastname: 'Ruiz',
    email: 'pepe@mail.com',
    username: 'pepe',
    password: '123456'
  }];

  constructor() { }

  findAll(): Observable<User[]> {
    return of(this.users);
  }
}

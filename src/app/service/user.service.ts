import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usuarios: User[] = [];

  getUsuarios(): User[] {
    return this.usuarios;
  }

  adicionarUsuario(user: User) {
    this.usuarios.push(user);
  }

  limparUsuarios(): void {
    this.usuarios = [];
  }

  constructor() {}
}

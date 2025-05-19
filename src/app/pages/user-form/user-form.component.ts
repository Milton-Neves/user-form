import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../models/user.model';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { ViaCepService } from '../../service/viacep.service';
import { UserService } from '../../service/user.service';
import { ButtonDefaultComponent } from "../components/button-default/button-default.component";

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ButtonDefaultComponent
],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  cepInvalido: boolean = false;

  constructor(
    private fb: FormBuilder,
    private viaCepService: ViaCepService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      cpf: ['', Validators.required],
      cep: ['', Validators.required],
      rua: [''],
      bairro: [''],
      cidade: [''],
      estado: [''],
    });

    this.userForm
      .get('cep')
      ?.valueChanges.pipe(
        debounceTime(300),
        filter((cep: string) => cep?.length === 8),
        distinctUntilChanged()
      )
      .subscribe((cep: string) => {
        const cepSemMascara = cep.replace(/\D/g, '');
        this.viaCepService.buscarCep(cepSemMascara).subscribe((data) => {
          if (!data.erro) {
            this.userForm.patchValue({
              rua: data.logradouro,
              bairro: data.bairro,
              cidade: data.localidade,
              estado: data.uf,
            });
          } else {
            this.userForm.patchValue({
              rua: '',
              bairro: '',
              cidade: '',
              estado: '',
            });
          }
        });
      });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const novoUsuario: User = this.userForm.value;
      this.userService.adicionarUsuario(novoUsuario);

      console.log('Usuário cadastrado:', this.userForm.value);
      this.userForm.reset();
    }
    Object.keys(this.userForm.controls).forEach((key) => {
      this.userForm.get(key)?.setErrors(null);
      this.userForm.get(key)?.markAsPristine();
      this.userForm.get(key)?.markAsUntouched();
    });
  }
}

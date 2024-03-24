import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatIconModule, 
    MatButtonModule, 
    MatCardModule, 
    MatInputModule, 
    MatFormFieldModule, 
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formRegister: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
  ){
    this.formRegister = this.formBuilder.group({
      full_name: ['', [Validators.required, Validators.minLength(2)]],
      position: ['', [Validators.required]],
      age: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      register: ['', [Validators.required]],
    })
  }

  async submitForm() {
    const formData = this.formRegister.value;

    const combined = {
      full_name: formData.full_name,
      position: formData.position,
      age: formData.age,
      salary: formData.salary,
      register: formData.register,
    }

    console.log(combined)
  }

}

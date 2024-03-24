import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';

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

  selectedFile: File | null = null;
  urlParams: any;
  collaboratorData: any;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
  }

  constructor(
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,

  ) {
    this.formRegister = this.formBuilder.group({
      full_name: ['', [Validators.required, Validators.minLength(2)]],
      position: ['', [Validators.required]],
      age: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      register: ['', [Validators.required]],
      photo: ['', [Validators.required]]
    })

    this.urlParams = this.activatedRoute.snapshot.queryParams;
    console.log(this.urlParams)

    this.collaboratorData = localStorage.getItem('collaborator');

    if(this.urlParams.update && this.collaboratorData){
      const collaborator = JSON.parse(this.collaboratorData);
      this.formRegister = this.formBuilder.group({
        full_name: [collaborator.nameEmployee, [Validators.required, Validators.minLength(2)]],
        position: [collaborator.position, [Validators.required]],
        age: [collaborator.age, [Validators.required]],
        salary: [collaborator.salary, [Validators.required]],
        register: [collaborator.registration, [Validators.required]],
        photo: [collaborator.photo, [Validators.required]]
      })
    }

    /* if(data.update){
      this.formRegister = this.formBuilder.group({
        full_name: [data., [Validators.required, Validators.minLength(2)]],
        position: ['', [Validators.required]],
        age: ['', [Validators.required]],
        salary: ['', [Validators.required]],
        register: ['', [Validators.required]],
        photo: ['', [Validators.required]]
      })
    } */
  }

  async submitForm() {
    const formData = new FormData();
  
    formData.append('Name', this.formRegister.get('full_name')?.value);
    formData.append('Position', this.formRegister.get('position')?.value);
    formData.append('Age', this.formRegister.get('age')?.value);
    formData.append('Salary', this.formRegister.get('salary')?.value);
    formData.append('Registration', this.formRegister.get('register')?.value);

    if (this.selectedFile !== null) {
      formData.append('Photo', this.selectedFile);
    }  
    this.enviarRequisicao(formData);
  }  


  async enviarRequisicao(formData: FormData) {

      try {
        const requestOptions = {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': '*/*'
          }
        };

        let response;

        if(this.urlParams && this.collaboratorData){
          requestOptions.method = 'PUT'

          response = await fetch(`http://localhost:5046/api/v1/employee/update/${this.urlParams.idEmployee}`, requestOptions);

        } else {
          requestOptions.method = 'POST'

          response = await fetch('http://localhost:5046/api/v1/employee', requestOptions);

        }

        console.log('Resposta:', response.status);
      } catch (error) {
        console.error('Erro ao enviar requisição:', error);
      }

  }


}

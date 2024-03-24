import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  submitForm(form: any) {
    console.log(form.value);
    // Aqui você tem acesso aos valores do formulário
    // por exemplo, form.value.nomeCompleto, form.value.cargo, etc.
  }

  saveData() {
    // Obtenha os valores do formulário usando NgForm
    const formData: NgForm = {} as NgForm; // Atribua o formulário ao objeto NgForm

    console.log(formData)
    
  }

}

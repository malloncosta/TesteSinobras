import { Routes } from '@angular/router';
import { InputComponent } from './input/input.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: 'input', component: InputComponent },
    { path: 'collaborators', component: CollaboratorsComponent },
    { path: 'register', component:  RegisterComponent}
];

import { Routes } from '@angular/router';
import { InputComponent } from './input/input.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';

export const routes: Routes = [
    { path: 'input', component: InputComponent },
    { path: 'collaborators', component: CollaboratorsComponent }
];

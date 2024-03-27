import { Routes } from '@angular/router';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { RegisterComponent } from './register/register.component';
import { RegisterPointComponent } from './register-point/register-point.component';
import { ReportComponent } from './report/report.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: 'collaborators', component: CollaboratorsComponent },
    { path: 'register', component:  RegisterComponent},
    { path: 'register-point', component: RegisterPointComponent },
    { path: 'report', component: ReportComponent },
    { path: 'about', component: AboutComponent },
    { path: 'home', component: HomeComponent},
    { path: '', component: HomeComponent },
];

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { MatListModule} from '@angular/material/list';
import { Routes, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule, 
    MatSidenavModule, 
    MatToolbarModule, 
    MatMenuModule, 
    MatListModule,
    HomeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  badgevisible = false;

  constructor(
    private router: Router
  ){
    //this.goHome();
  }

  badgevisibility() {
    this.badgevisible = true;
  }

  goCollaborators(){
    this.router.navigate(['/collaborators'])
  }

  goRegisterPoint(){
    this.router.navigate(['/register-point'])
  }

  goReport(){
    this.router.navigate(['/report'])
  }

  goAbout(){
    this.router.navigate(['/about'])
  }

  goHome(){
    this.router.navigate(['/home'])
  }

}

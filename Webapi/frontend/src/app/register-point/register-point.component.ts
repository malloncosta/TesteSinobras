import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RestMethods } from '../../../providers/rest-methods';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register-point',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatCardModule, CommonModule, NgxPaginationModule ],
  templateUrl: './register-point.component.html',
  styleUrl: './register-point.component.css'
})
export class RegisterPointComponent {
  attendances: any;
  collaborators: any;
  currentDate: Date = new Date();
  imageSrcMap: Map<number, string> = new Map<number, string>(); 

  public currentPage = 1; 
  public itemsPerPage = 5;

  constructor(
    private rest: RestMethods,
    private _snackBar: MatSnackBar
  ) {
    this.getAttendances();
  }

  async getAttendances() {
    const url = `${environment.urlApi}/api/v1/employee`
    const [status, response] = await this.rest.getData(url);
    if (status === 200) {
      this.collaborators = response;

      this.attendances = this.collaborators
        .filter((attendance: { attendance: any; }) => attendance.attendance)
        .map((attendance: { attendance: any; }) => attendance.attendance);
      
      console.log(this.collaborators)
      this.preloadImages();
    }
  }

  async registerEntry(collaborator: any){
    const url = `${environment.urlApi}/api/v1/attendance/entry/${collaborator.employeeId}`
    const status = await this.rest.postData(url);
    if (status === 200) {
      this.openSnackBar("Entrada registrada", "Sucesso");
      this.getAttendances();
    } else {
      this.openSnackBar("Entrada não registrada", "Erro");
    }
  }

  async registerExit(collaborator: any){
    const url = `${environment.urlApi}/api/v1/attendance/exit/${collaborator.employeeId}`

    if(!collaborator.hasEntryToday){
      this.openSnackBar("Registre a entrada primeiro", "Erro");
      return;
    }

    const status = await this.rest.postData(url);
    if (status === 200) {
      this.openSnackBar("Saída registrada", "Sucesso");
      this.getAttendances();
    } else {
      this.openSnackBar("Saída não registrada", "Erro");
    }
  }

  async preloadImages() {
    for (const collaborator of this.collaborators) {
      const imageUrl = `${environment.urlApi}/api/v1/employee/image/${collaborator.employeeId}`;
      try {
        const response = await fetch(imageUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if (response.ok) {
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          this.imageSrcMap.set(collaborator.employeeId, imageUrl);
        } else {
          console.error('Erro ao obter a imagem:', response.status);
        }
      } catch (error) {
        console.error('Erro ao obter a imagem:', error);
      }
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RestMethods } from '../../../providers/rest-methods';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-point',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './register-point.component.html',
  styleUrl: './register-point.component.css'
})
export class RegisterPointComponent {
  attendances: any;
  collaborators: any;

  constructor(
    private rest: RestMethods,
    private _snackBar: MatSnackBar
  ) {
    this.getAttendances();
  }

  async getAttendances() {
    const url = "http://localhost:5046/api/v1/employee?pageNumber=0&pageQuantity=150"
    const [status, response] = await this.rest.getData(url);
    if (status === 200) {
      this.collaborators = response;

      this.attendances = this.collaborators
        .filter((attendance: { attendance: any; }) => attendance.attendance)
        .map((attendance: { attendance: any; }) => attendance.attendance);
    }
  }

  async registerEntry(employeeId: number){
    const url = `http://localhost:5046/api/v1/attendance/entry/${employeeId}`
    const status = await this.rest.postData(url);
    if (status === 200) {
      this.openSnackBar("Entrada registrada", "Sucesso");
    } else {
      this.openSnackBar("Entrada não registrada", "Erro");
    }
  }

  async registerExit(employeeId: number){
    const url = `http://localhost:5046/api/v1/attendance/exit/${employeeId}`
    const status = await this.rest.postData(url);
    if (status === 200) {
      this.openSnackBar("Saída registrada", "Sucesso");
    } else {
      this.openSnackBar("Saída não registrada", "Erro");
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

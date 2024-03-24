import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RestMethods } from '../../../providers/rest-methods';

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
}

import { Component, ViewEncapsulation } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RestMethods } from '../../../providers/rest-methods';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';


const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    MatIconModule, 
    MatButtonModule, 
    MatCardModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    CommonModule,
  ],
  providers: [
    provideMomentDateAdapter(MY_FORMATS),
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  date = new FormControl(moment());
  collaborators: any;

  public currentPage = 1; 
  public itemsPerPage = 5;

  constructor(
    private rest: RestMethods,
  ){

  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();

    const year = normalizedMonthAndYear.year();
    const month = normalizedMonthAndYear.month() + 1;

    this.getPointRegisted(year, month)
  }

  async getPointRegisted(year: number, month: number){
    const url = `http://localhost:5046/api/v1/attendance/year/${year}/month/${month}?pageNumber=0&pageQuantity=10`
    const [status, response] = await this.rest.getData(url);
    if(status === 200){
      this.collaborators = response;
      console.log(response)
    }
  }

  calcularHorasTrabalhadas(collaborator: any) {
    let totalHours = 0;

    collaborator.attendance.forEach((entry: { entryTime: string | number | Date; exitTime: string | number | Date; }) => {
      const entryTime = new Date(entry.entryTime);
      const exitTime = new Date(entry.exitTime);
      const diff = exitTime.getTime() - entryTime.getTime();
      totalHours += diff / (1000 * 60 * 60);
    });

    return totalHours.toFixed(4);
  }

}

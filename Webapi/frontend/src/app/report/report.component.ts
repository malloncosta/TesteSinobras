import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RestMethods } from '../../../providers/rest-methods';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from '../../environments/environment';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';


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
    CanvasJSAngularChartsModule
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
  imageSrcMap: Map<number, string> = new Map<number, string>();

  public currentPage = 1;
  public itemsPerPage = 5;
  data: { label: string, y: number }[] = [];
  chartOptions: any;

  constructor(
    private rest: RestMethods,
  ) {
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

  async getPointRegisted(year: number, month: number) {
    const url = `${environment.urlApi}/api/v1/attendance/year/${year}/month/${month}`
    const [status, response] = await this.rest.getData(url);
    if (status === 200) {
      this.collaborators = response;
      console.log(response)
      this.calculatePercentagesWorked();

      this.chartOptions = {
        animationEnabled: true,
        theme: "ligth",
        exportEnabled: false,
        title: {
          text: "Horas Totais Trabalhadas"
        },
        subtitles: [{
          text: "Horas por mês"
        }],
        data: [{
          type: "column",
          dataPoints: this.data
        }]
      }
      this.preloadImages();
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

  calculateHoursWorked(collaborator: any) {
    let totalMilliseconds = 0;
    let hasValidEntry = false;

    for (const entry of collaborator.attendance) {
      const entryTime = new Date(entry.entryTime);
      const exitTime = entry.exitTime ? new Date(entry.exitTime) : null;

      if (entryTime && exitTime) {
        hasValidEntry = true;
        const diff = exitTime.getTime() - entryTime.getTime();
        totalMilliseconds += diff;
      }
    }

    if (!hasValidEntry) {
      return "Sem registros de entrada e saída válidos.";
    }

    const millisecondsInHour = 1000 * 60 * 60;
    const millisecondsInMinute = 1000 * 60;
    const hours = Math.floor(totalMilliseconds / millisecondsInHour);
    const minutes = Math.floor((totalMilliseconds % millisecondsInHour) / millisecondsInMinute);
    const seconds = Math.floor((totalMilliseconds % millisecondsInMinute) / 1000);

    return `${hours} horas, ${minutes} minutos e ${seconds} segundos`;
  }

  calculatePercentageWorked(attendance: any[]): number {
    let totalHoursWorked = 0;
    let totalValidRecords = 0; 
    
    attendance.forEach(entry => {
      if (entry.entryTime && entry.exitTime) {
        const entryTime = new Date(entry.entryTime);
        const exitTime = new Date(entry.exitTime);
        const diff = exitTime.getTime() - entryTime.getTime();
        totalHoursWorked += diff;
        totalValidRecords++;
      }
    });

    if (totalValidRecords === 0) {
      return 0;
    }
    
    const totalHoursWorkedInHours = totalHoursWorked / (1000 * 60 * 60);
    return totalHoursWorkedInHours;
}


calculatePercentagesWorked(): void {
    this.collaborators.forEach((employee: { attendance: any[]; name: any; }) => {
      const percentageworked = this.calculatePercentageWorked(employee.attendance);
      this.data.push({ label: employee.name, y: percentageworked });
    });
  }

}

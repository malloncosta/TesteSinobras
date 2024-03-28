import { Component } from '@angular/core';
import { RestMethods } from '../../../providers/rest-methods';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-collaborators',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule, MatButtonModule, NgxPaginationModule],
  templateUrl: './collaborators.component.html',
  styleUrl: './collaborators.component.css'
})
export class CollaboratorsComponent {
  collaborators: any;

  public currentPage = 1;
  public itemsPerPage = 5;

  imageSrcMap: Map<number, string> = new Map<number, string>(); 

  constructor(
    private rest: RestMethods,
    private router: Router,
  ) {
    this.getCollaborators();
  }

  async getCollaborators() {
    const url = `${environment.urlApi}/api/v1/employee`
    const [status, response] = await this.rest.getData(url);
    if (status === 200) {
      this.collaborators = response;
      this.preloadImages();
      console.log(this.collaborators)
    }
  }

  async deleteCollaborator(id: number) {
    const url = `${environment.urlApi}/api/v1/employee/delete/${id}`
    const status = await this.rest.deleteData(url);
    if (status === 200) {
      console.log("apagado com sucesso")
      this.getCollaborators();
    }
  }

  goRegister() {
    const queryParams = {
      update: false,
    };

    this.router.navigate(['/register'], {
      queryParams: queryParams
    })
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

  goUpdate(collaborator: any) {
    const queryParams = {
      update: true,
      idEmployee: collaborator.employeeId,
    };

    localStorage.setItem('collaborator', JSON.stringify(collaborator));

    this.router.navigate(['/register'], {
      queryParams: queryParams,
    });
  }

}

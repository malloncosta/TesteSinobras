import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RestMethods } from '../../../providers/rest-methods';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-collaborators',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './collaborators.component.html',
  styleUrl: './collaborators.component.css'
})
export class CollaboratorsComponent {
  /* collaborators = [
    {
      "id": 3,
      "nameEmployee": "Silva",
      "registration": 23444,
      "position": "empregado",
      "salary": 3242,
      "photo": "Storage\\pico-da-montanha-nevada-sob-a-majestade-generativa-da-galaxia-estrelada-ai.jpg"
    },
    {
      "id": 4,
      "nameEmployee": "João",
      "registration": 21315,
      "position": "piloto",
      "salary": 5200,
      "photo": "Storage\\beleza-abstrata-de-outono-em-padrao-multicolorido-de-veios-de-folhas-gerado-por-ia.jpg"
    }
  ] */

  collaborators: any;

  constructor(
    private rest: RestMethods,
  ) {
    this.getCollaborators();
  }

  async getCollaborators() {
    const url = "http://localhost:5046/api/v1/employee?pageNumber=0&pageQuantity=23"
    const [status, response] = await this.rest.getData(url);
    if(status === 200){
      this.collaborators = response;
    }
    console.log(this.collaborators)
  }

  async deleteCollaborator(id: number){
    const url = `http://localhost:5046/api/v1/employee/delete/${id}`
    const status = await this.rest.deleteData(url);
    if(status === 200){
      console.log("apagado com sucesso")
      this.getCollaborators();
    }
  }

}

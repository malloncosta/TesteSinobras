import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RestMethods {
  constructor() {}
  async postData(url: string, data = {}) {
    const headers: any = {
      'Content-Type': 'application/json',
    };

    /* const token = localStorage.getItem('TokenUser');
    if (token) {
      headers['Authorization'] = 'Token ' + token;
    } */

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers,
      });

      const status = await response.status;
      //const result = await response.json();
      //return [status, result];
      return status;
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      throw error; // Puedes manejar el error según tus necesidades
    }
  }

  async putData(url: string, data = {}) {
    const headers: any = {
      'Content-Type': 'application/json',
    };

    /* const token = localStorage.getItem('TokenUser');
    if (token) {
      headers['Authorization'] = 'Token ' + token;
    } */

    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers,
    });

    const status = await response.status;
    const result = await response.json();
    return [status, result];
  }

  async getData(url: string) {
    const headers: any = {};
    headers['Content-Type'] = 'application/json';

    /* const token = localStorage.getItem('TokenUser');
    if (token !== 'undefined' && token !== null && token !== '') {
      headers['Authorization'] = 'Token ' + token;
    } */

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });
    const status = await response.status;
    const result = await response.json();
    return [status, result];
  }

  async deleteData(url: string) {
    const headers: any = {};

    /* const token = localStorage.getItem('TokenUser');
    headers['Content-Type'] = 'application/json';
    if (token !== 'undefined' && token !== null && token !== '') {
      headers['Authorization'] = 'Token ' + token;
    }  */

    const response = await fetch(url, {
      method: 'DELETE',
      headers,
    });
    const status = await response.status;
    return status;
  }
}

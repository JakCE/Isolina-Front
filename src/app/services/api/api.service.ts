import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = environment.apiURL;
  constructor(private http: HttpClient) { }

  postUsuario(request: any) {
    let assign = `${this.apiURL}/api/auth/register`
    return this.http.post<any>(assign, request)
  }

  async consultarDNI(dni: string): Promise<any> {
    const url = `https://dniruc.apisperu.com/api/v1/dni/${dni}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6IkNBTVBPU0pDQ09BUlVDQVlBTElAR01BSUwuQ09NIn0.aJmLfRrIiw860ZBkyWehExFK-qBjpBlzX0_jcc851rg`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al consultar el API');
      }
      return response.json();
    } catch (error) {
      console.error('Error consultando el API', error);
      throw error;
    }
  }

  //
  //End-points
  getUser(id: any) {
    let list = `${this.apiURL}/api/usuarios/${id}`
    return this.http.get<any>(list)
  }
  //SEDES
  getSedes() {
    let list = `${this.apiURL}/api/sedes`
    return this.http.get<any>(list)
  }
  getSede(id: any) {
    let list = `${this.apiURL}/api/sedes/${id}`
    return this.http.get<any>(list)
  }
  postSedes(request: any) {
    let assign = `${this.apiURL}/api/sedes`
    return this.http.post<any>(assign, request)
  }
  putSedes(id: any, request: any) {
    let assign = `${this.apiURL}/api/sedes/${id}`
    return this.http.patch<any>(assign, request)
  }
  deleteSedes(id: any) {
    let assign = `${this.apiURL}/api/sedes/${id}`
    return this.http.delete<any>(assign)
  }
}

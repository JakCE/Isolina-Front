import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = environment.apiURL;
  constructor(private http: HttpClient) { }

  //End-points
  getEstudiantes() {
    let list = `${this.apiURL}/api/estudiantes`
    return this.http.get<any>(list)
  }
  postEstudiantes(request: any) {
    let assign = `${this.apiURL}/api/estudiantes`
    return this.http.post<any>(assign, request)
  }
  putEstudiantes(request: any) {
    let assign = `${this.apiURL}/api/estudiantes`
    return this.http.put<any>(assign, request)
  }
  deleteEstudiantes(id: any) {
    let assign = `${this.apiURL}/api/estudiantes/${id}`
    return this.http.delete<any>(assign)
  }
}

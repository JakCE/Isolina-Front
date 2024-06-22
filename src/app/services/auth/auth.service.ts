import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL = environment.apiURL;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  postLogin(request: any) {
    let assign = `${this.apiURL}/api/auth/login`
    return this.http.post<any>(assign, request)
  }
  isAuth():boolean{
    const token = localStorage.getItem('token');
    if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }
}

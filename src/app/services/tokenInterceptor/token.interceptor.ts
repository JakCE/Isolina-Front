import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  const cloneRequest =  req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`
    }
  });

  return next(cloneRequest).pipe(
    catchError((error: HttpErrorResponse)=>{
      return throwError(error)
    })
  );
};
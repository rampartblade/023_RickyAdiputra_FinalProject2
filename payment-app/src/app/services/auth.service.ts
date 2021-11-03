import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'

import { Userdata } from 'src/models/userdata';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string='http://localhost:5001/api/PaymentDetail'
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  addData(user: Userdata): Observable <any>{
    const api = `${this.endpoint}`;
    return this.http.post(api, user).pipe(catchError(this.handleError))
  }

  handleError(err: HttpErrorResponse){
    let msg='';
    if(err.error instanceof ErrorEvent){
      msg = err.error.message;
    }
    else{
      msg = `Server-side Error Code: ${err.status} \n Message: ${err.message}`;
    }
    return throwError(msg);
  }
}

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
export enum URLTYPE {
  LOGIN,
  MEMBER,
  PUBLISHER,
  AUTHORBOOK,
  BORROWER,
  BOOK
};

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private BASE_URL_API = 'api';
  private httpOptions = {headers: 
    new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    })}
  constructor(
    private httpClient: HttpClient
  ) { 
  }

  getUrl(typeUrl: URLTYPE) {
    let url;
    switch (typeUrl) {
      case URLTYPE.AUTHORBOOK: 
        url = this.BASE_URL_API + '/author-book';    
        break;
      case URLTYPE.MEMBER: 
        url = this.BASE_URL_API + '/member';    
        break;
      case URLTYPE.BOOK: 
        url = this.BASE_URL_API + '/book';    
        break;
      case URLTYPE.PUBLISHER: 
        url = this.BASE_URL_API + '/publisher';    
        break;
      case URLTYPE.BORROWER: 
        url = this.BASE_URL_API + '/borrower';    
        break;
      case URLTYPE.LOGIN: 
        url = this.BASE_URL_API + '/login';    
        break;
    
      default:
        break;
    }
    return url;
  }

  list(urlType: URLTYPE, params?: any): Observable<any> {
    return this.httpClient.get(this.getUrl(urlType), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        console.error('An error occured:', error.error.message);
    } else {
        console.log(`Backend returned code ${error.status}, body was: ${error.status}`);    
    }
  return  throwError(`Something bad happened; please try again later.`);  
}
}

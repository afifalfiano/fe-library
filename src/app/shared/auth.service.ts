import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LibraryService } from './library.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  getToken() {
    return !!localStorage.getItem("access_token");
  }
}

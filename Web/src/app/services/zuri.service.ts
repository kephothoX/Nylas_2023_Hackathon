import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError } from 'rxjs';

import { ErrorService } from './error.service';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class ZuriService {

  constructor(
    private _httpClient: HttpClient,
    private _appService: AppService,
    private _errorService: ErrorService
  ) { }


  loadContacts(data: {}): Observable<any> {
      return this._httpClient.post(`${ this._appService.apiUrl }/contacts`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  Connect(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.apiUrl}/connect/authorize`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  authorizeApp(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.apiUrl}/authorize/app`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  setAccountTokens(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.apiUrl}/accounts/tokens`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

}

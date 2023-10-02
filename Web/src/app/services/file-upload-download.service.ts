import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, catchError } from 'rxjs';

import { ErrorService } from 'src/app/services/error.service';
import { AppService } from 'src/app/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadDownloadService {

  constructor(
    private _httpClient: HttpClient,
    private _appService: AppService,
    private _errorService: ErrorService,
  ) { }

  getFiles(): Observable<any> {
    return this._httpClient.get(`${ this._appService.apiUrl }/all`, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  addNewFile(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.apiUrl }/new`, data, this._appService.httpMultipartFormOptions ).pipe(catchError(this._errorService.handleError));
  }

  getFileById(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.apiUrl }/id`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  editFile(data: any): Observable<any> {
    return this._httpClient.put(`${ this._appService.apiUrl }/edit`, data, this._appService.httpMultipartFormOptions).pipe(catchError(this._errorService.handleError));
  }

  getFilesByAuthor(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.apiUrl }/author`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  

}
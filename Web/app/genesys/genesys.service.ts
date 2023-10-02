import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError } from 'rxjs';

import { ErrorService } from '../services/error.service';
import { AppService } from '../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class GenesysService {

  constructor(
    private _httpClient: HttpClient,
    private _appService: AppService,
    private _errorService: ErrorService
  ) { }


  getContacts(data: {}): Observable<any> {
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

  getMessages(data: {}): Observable<any> {
    return this._httpClient.post(`${ this._appService.apiUrl }/messages`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getMessage(data: {}): Observable<any> {
    return this._httpClient.post(`${ this._appService.apiUrl }/message`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  analyzeEmail(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.apiUrl }/expert-ai-analysis`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  sendEmail(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.apiUrl }/send-message`, data, this._appService.httpMultipartFormOptions).pipe(catchError(this._errorService.handleError));
  }

  AIPrompt(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.apiUrl }/prompt`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  AISummary(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.apiUrl }/summarize`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  AICalendarSummary(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.apiUrl }/summarize/calendar/events`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getCalendar(data: {}): Observable<any> {
      return this._httpClient.post(`${ this._appService.apiUrl }/calendar`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  extractEmailText(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.apiUrl }/extract`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  genChat(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.apiUrl }/chat`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }


  getCalendarEvents(data: {}): Observable<any> {
      return this._httpClient.post(`${ this._appService.apiUrl }/calendar/events`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  generateEventFromChat(): Observable<any> {
    return this._httpClient.get(`${ this._appService.apiUrl }/event/chat`, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getFile(data: {}): Observable<any> {
    return this._httpClient.post(`${ this._appService.apiUrl }/files`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }


  textToSpeech(data: {}): Observable<any> {
    return this._httpClient.post(`${ this._appService.apiUrl }/text/to/speech`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  markAsRead(data: {}): Observable<any> {
    return this._httpClient.post(`${ this._appService.apiUrl }/message/mark-as-read`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  markAsUnRead(data: {}): Observable<any> {
    return this._httpClient.post(`${ this._appService.apiUrl }/message/mark-as-unread`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }


  starMessage(data: {}): Observable<any> {
    return this._httpClient.post(`${ this._appService.apiUrl }/message/star`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  unStarMessage(data: {}): Observable<any> {
    return this._httpClient.post(`${ this._appService.apiUrl }/message/unstar`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }


}

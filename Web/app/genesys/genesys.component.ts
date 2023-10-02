import { Component, OnInit, Inject, NgZone, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Overlay } from '@angular/cdk/overlay';

import { Buffer  } from 'buffer';

import { Dialog, DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';


import { Message, ExpertAIResponse, Schema, WritePrint, TemporalInformation, WritePrintReadAbilityIndexes,  HateSpeech } from './genesys';
import { GenesysService } from './genesys.service';
import { CalendarEvent } from './genesys';
import { StorageService } from './storage.service';
import { AppService } from 'src/app/services/app.service';

import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-genesys',
  templateUrl: './genesys.component.html',
  styleUrls: ['./genesys.component.scss']
})
export class GenesysComponent implements AfterViewInit, OnInit {
  Messages!: MatTableDataSource<Message[]>;
  displayedColumns: string[] = ['from', 'subject', 'id'];
  clickedRows = new Set<Message[]>();
  columnsToDisplay: string[] = new Array();
  Media: any;
  MediaURL!: String;


  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200, 250, 300, 350, 400, 450, 500];
  pageLength: number = this.pageSizeOptions.length;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<Message>;
  @ViewChild(MatSort) sort!: MatSort;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnsToDisplay, event.previousIndex, event.currentIndex)
  }

  applyFilter(event: Event) {
    const filterValue: any = (event.target as HTMLInputElement).value;
    this.Messages.filter = filterValue.trim().toLowerCase();
  }


  constructor(
    private _genesysService: GenesysService,
    private _appService: AppService,
    private _storageService: StorageService,
    public _snackbar: MatSnackBar,
    public _dialog: Dialog,
    private _overlay: Overlay) { }

  openMessage(data: any) {
    const scrollStrategy = this._overlay.scrollStrategies.reposition()
    this._dialog.open(ViewMessage, {
      minWidth: '100%',
      minHeight: '100%',
      hasBackdrop: true,
      autoFocus: true,
      restoreFocus: false,
      data: {
        body: data,
      },
      scrollStrategy
    });
  }

  openMessageAnalytics(data: any) {
    const scrollStrategy = this._overlay.scrollStrategies.reposition()
    this._dialog.open(MessageAnalytics, {
      minWidth: '100%',
      minHeight: '100%',
      hasBackdrop: true,
      autoFocus: true,
      restoreFocus: false,
      data: {
        body: data,
      },
      scrollStrategy
    });
  }

  openComposeMessage() {
    const scrollStrategy = this._overlay.scrollStrategies.reposition()
    this._dialog.open(ComposeMessage, {
      minWidth: '100%',
      minHeight: '100%',
      hasBackdrop: true,
      autoFocus: true,
      restoreFocus: false,
      scrollStrategy
    });
  }

  openMessageReply(from: any, body: any) {
    const scrollStrategy = this._overlay.scrollStrategies.reposition()
    this._dialog.open(ReplyMessage, {
      minWidth: '100%',
      minHeight: '100%',
      hasBackdrop: true,
      autoFocus: true,
      restoreFocus: false,
      data: {
        from: from,
        body: body
      },
      scrollStrategy
    });
  }

  openCalendar() {
    const scrollStrategy = this._overlay.scrollStrategies.reposition()
    this._dialog.open(Calendar, {
      minWidth: '100%',
      minHeight: '100%',
      hasBackdrop: true,
      autoFocus: true,
      restoreFocus: false,
      scrollStrategy
    });
  }





  ngAfterViewInit(): void {
   
  }

  ngOnInit() {
     if (window.sessionStorage.getItem('nylas_token') != null || undefined) {

      this.displayMessages();

    } else {

      this._storageService.getUserTokens(`${window.sessionStorage.getItem('active_user_email')}`);
      this.displayMessages();
    }
    this._appService.saveRouterURL();

    for (let column of this.displayedColumns) {
      this.columnsToDisplay.push(column);
    }
  }


  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
  }

  displayMessages() {
    this._genesysService.getMessages({ token: window.sessionStorage.getItem('nylas_token') }).subscribe((response: any) => {
      this.Messages = response;
      this.Messages = new MatTableDataSource(response);
      this.Messages.paginator = this.paginator;
      this.paginator.page;
      this.Messages.sort = this.sort;
      this.paginator.pageIndex;
    });
  }



  playAISummaryMessage(data: any) {
    this._genesysService.extractEmailText({ html: data }).subscribe((extractEmailTextResponse: any) => {
      this._genesysService.AISummary({ text: extractEmailTextResponse }).subscribe((AIsummaryResponse: any) => {

        if (AIsummaryResponse != null || undefined) {
          this._genesysService.textToSpeech({ text: AIsummaryResponse }).subscribe((response: any) => {

            const data = Buffer.from(response, 'base64');
            console.log(data)
            const file = new Blob([data], { type: 'audio/mpeg' });
            this.Media = file;

            this.MediaURL  = URL.createObjectURL(file);


          });
        } else {
          this._snackbar.open('No Summary available for this Email at the Moment', 'Close');
        }
      });
    });
  }
 
  markAsRead(id: String) {
    this._genesysService.markAsRead({
      message_id: id,
      token: window.sessionStorage.getItem('nylas_token')
    }).subscribe((response: any) => {
      this._snackbar.open('Message Marked As Read.', 'Close');
    });

  }

  markAsUnRead(id: String) {
    this._genesysService.markAsUnRead({
      message_id: id,
      token: window.sessionStorage.getItem('nylas_token')
    }).subscribe((response: any) => {
      this._snackbar.open('Message Marked As UnRead.', 'Close');
    });

  }

  starMessage (id: String) {
    this._genesysService.starMessage({
      message_id: id,
      token: window.sessionStorage.getItem('nylas_token')
    }).subscribe((response: any) => {
      this._snackbar.open('Message Star Successful.', 'Close');
    });
  }

  unStarMessage (id: String) {
    this._genesysService.unStarMessage({
      message_id: id,
      token: window.sessionStorage.getItem('nylas_token')
    }).subscribe((response: any) => {
      this._snackbar.open('Message UnStar Successful.', 'Close');
    });
  }


}



@Component({
  selector: 'view-message',
  templateUrl: './view-message.html',
  styleUrls: ['./view-message.scss'],
})
export class ViewMessage {
  constructor(
    @Inject(DIALOG_DATA) public data: MsgBody,
    public _dialogRef: DialogRef
  ) { }


  close() {
    this._dialogRef.close();
  }

}

@Component({
  selector: 'message-analytics',
  templateUrl: './message-analytics.html',
  styleUrls: ['./message-analytics.scss'],
})
export class MessageAnalytics implements OnInit {
  ExpertAIResponse!: ExpertAIResponse;
  Text!: String;
  PII!: Schema[];
  TemporalInformation!: TemporalInformation[];
  WritePrint!: WritePrint;
  HateSpeech!: HateSpeech[];
  StructureIndexes!: String;
  ReadAbilityIndexes!: Array<WritePrintReadAbilityIndexes>;

  constructor(
    @Inject(DIALOG_DATA) public data: MsgBody,
    public _dialogRef: DialogRef,
    private _genesysService: GenesysService,
    private _formBuilder: FormBuilder,
  ) { }


  ngOnInit(): void {
    this._genesysService.extractEmailText({ html: this.data.body }).subscribe((extractEmailTextResponse: any) => {
      this._genesysService.analyzeEmail({ text: extractEmailTextResponse }).subscribe((analyzeEmailResponse: any) => {
        this.ExpertAIResponse = analyzeEmailResponse;
        this.Text = extractEmailTextResponse;

        this.HateSpeech = analyzeEmailResponse.hate_speech

        this.PII = JSON.parse(analyzeEmailResponse.pii)['JSON-LD']['@graph'];
        this.TemporalInformation = JSON.parse(analyzeEmailResponse.temporal_information)['JSON-LD']['@graph']['items'];
        this.WritePrint = JSON.parse(analyzeEmailResponse.write_print)['JSON-LD']['@graph'];

        for (let entry of JSON.parse(analyzeEmailResponse.write_print)['JSON-LD']['@graph']) {
          this.ReadAbilityIndexes = entry.readabilityIndexes;
          this.StructureIndexes = JSON.stringify(entry.structureIndexes);
        }

      });
    });
  }

  messageAnalyticsForm = this._formBuilder.group({
    text: ['', Validators.required]
  })

  analyze() {
    this._genesysService.analyzeEmail({ text: this.Text }).subscribe((response: any) => {
      this.ExpertAIResponse = response;
    });

  }

  resetForm() {
    this.messageAnalyticsForm.reset();
  }

  close() {
    this._dialogRef.close();
  }

  summarizeText() {
    this._genesysService.AISummary({ text: this.Text }).subscribe((response: any) => {
      this.Text = response
    });
  }

  summarize() {
    this._genesysService.AISummary({ text: this.StructureIndexes }).subscribe((response: any) => {
      this.StructureIndexes = response
    });
  }

}

@Component({
  selector: 'reply-message',
  templateUrl: './reply-message.html',
  styleUrls: ['./reply-message.scss'],
})
export class ReplyMessage implements OnInit {
  formData  = new FormData();
  ChatResponse: String[] = [];
  ChatQuery: String[] = [];
  Receiver!: String;
  Response!: String;

  ExpertAIResponse!: ExpertAIResponse;
  Text!: String;
  PII!: Schema[];
  TemporalInformation!: TemporalInformation[];
  WritePrint!: WritePrint;
  HateSpeech!: HateSpeech[];
  StructureIndexes!: String;
  ReadAbilityIndexes!: Array<WritePrintReadAbilityIndexes>;


  constructor(
    @Inject(DIALOG_DATA) public data: ReplyDataset,
    public _dialogRef: DialogRef,
    private _genesysService: GenesysService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this._genesysService.extractEmailText({ html: this.data.body }).subscribe((extractEmailTextResponse: any) => {
      this._genesysService.AISummary({ text: extractEmailTextResponse }).subscribe((summaryResponse: any) => {
        this.ChatResponse.push(summaryResponse);
        this.ChatQuery.push(`Generate an email response about ${summaryResponse}.`);


      });
    });
  }

  messageReplyForm = this._formBuilder.group({
    text: ['', Validators.required]
  })

  onSubmit() {
    this.formData.append('receiver', `${ this.data.from }`);
    this.formData.append('message', `${ this.messageReplyForm.value.text }`);

    this._genesysService.sendEmail(this.formData).subscribe((response: any) => {
       this._snackBar.open('Message Sent.', 'Close');
    });

  }

  returnLastResponse(items: String[]) {
    const num_of_items = items.length;
    if (num_of_items > 1) {

      return items[num_of_items - 1];

    }

    return items[0];
  }

  Chat(event: Event) {
    const text = (event.target as HTMLInputElement).value;

    this.ChatQuery.push(text);

    this._genesysService.genChat({ context: ` ${this.returnLastResponse(this.ChatResponse)}`, text: `Generate a response from this text: ${text}` }).subscribe((chatResponse: any) => {

      if (chatResponse == null || undefined ) {
        this._snackBar.open('No Results From AI');
      }
      
      this.ChatResponse.push(chatResponse);

      this.Response = this.returnLastResponse(this.ChatResponse);
    });
  }



  genResponse() {
    this._genesysService.genChat({ text: `Generate a response from this text: ${this.returnLastResponse(this.ChatResponse)}` }).subscribe((chatResponse: any) => {

      if (chatResponse == null || undefined ) {
        this._snackBar.open('No Results From AI');
      }

      this.ChatResponse.push(chatResponse);
    });
  }

  resetForm() {
    this.messageReplyForm.reset();
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.formData.append('attachment', event.target.files[0]);
      console.log(event.target.files[0]);
    }
  }

  close() {
    this._dialogRef.close();
  }

  textAnalytics() {
    this._genesysService.analyzeEmail({ text: this.messageReplyForm.value.text }).subscribe((analyzeEmailResponse: any) => {
      this.ExpertAIResponse = analyzeEmailResponse;

      this.HateSpeech = analyzeEmailResponse.hate_speech

      this.PII = JSON.parse(analyzeEmailResponse.pii)['JSON-LD']['@graph'];
      this.TemporalInformation = JSON.parse(analyzeEmailResponse.temporal_information)['JSON-LD']['@graph']['items'];
      this.WritePrint = JSON.parse(analyzeEmailResponse.write_print)['JSON-LD']['@graph'];

      for (let entry of JSON.parse(analyzeEmailResponse.write_print)['JSON-LD']['@graph']) {
        this.ReadAbilityIndexes = entry.readabilityIndexes;
        this.StructureIndexes = JSON.stringify(entry.structureIndexes);
      }

    });
  }

}

@Component({
  selector: 'compose-message',
  templateUrl: './compose-message.html',
  styleUrls: ['./compose-message.scss'],
})
export class ComposeMessage implements OnInit {
  AIPromptResponse?: String;
  formData = new FormData();
  UserEmail: String | null = window.sessionStorage.getItem('active_user_email');

  ExpertAIResponse!: ExpertAIResponse;
  Text!: String;
  PII!: Schema[];
  TemporalInformation!: TemporalInformation[];
  WritePrint!: WritePrint;
  HateSpeech!: HateSpeech[];
  StructureIndexes!: String;
  ReadAbilityIndexes!: Array<WritePrintReadAbilityIndexes>;


  constructor(
    public _dialogRef: DialogRef,
    private _genesysService: GenesysService,
    private _formBuilder: FormBuilder,
    private _ngZone: NgZone,
    public _snackBar: MatSnackBar,
  ) { }

  triggerResize() {
    this._ngZone.onStable.pipe(take(1)).subscribe(() => {
      this.autosize.resizeToFitContent(true);
    });
  }

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  ngOnInit(): void {

  }

  composeMessageForm = this._formBuilder.group({
    receiver: ['', Validators.required],
    bcc: [''],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });


  onSubmit() {
    this.formData.append('token', `${window.sessionStorage.getItem('nylas_token')}`);
    this.formData.append('sender', `${this.UserEmail}`);
    this.formData.append('receiver', `${this.composeMessageForm.value.receiver}`);
    this.formData.append('subject', `${this.composeMessageForm.value.subject}`);
    this.formData.append('message', `${this.composeMessageForm.value.message}`);

    if (this.composeMessageForm.value.bcc != null || undefined || '') {
      this.formData.append('bcc', `${this.composeMessageForm.value.bcc}`);
    }

    this._genesysService.sendEmail(this.formData).subscribe((response: any) => {
       this._snackBar.open('Message Sent.', 'Close');
    });
  }

  AIPromptRequest() {
    const text = this.composeMessageForm.value.subject;
    console.log(text);
    this._genesysService.AIPrompt({ text: text }).subscribe((response: any) => {

      if (response == null || undefined ) {
        this._snackBar.open('No Results From AI');
      }

      this.AIPromptResponse = response;
     
    });
  }

  summarizeText() {
    this._genesysService.AISummary({ text: this.composeMessageForm.value.message }).subscribe((response: any) => {

      if (response == null || undefined ) {
        this._snackBar.open('No Results From AI');
      }


      this.AIPromptResponse = response;
    });

  }

  resetForm() {
    this.composeMessageForm.reset();
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.formData.append('attachment', event.target.files[0]);
      this.formData.append('attachment_name', `${event.target.files[0].name}`);
      console.log(event.target.files[0]);
    }
  }

  close() {
    this._dialogRef.close();
  }

  textAnalytics() {
    this._genesysService.analyzeEmail({ text: this.composeMessageForm.value.message }).subscribe((analyzeEmailResponse: any) => {
      this.ExpertAIResponse = analyzeEmailResponse;

      this.HateSpeech = analyzeEmailResponse.hate_speech

      this.PII = JSON.parse(analyzeEmailResponse.pii)['JSON-LD']['@graph'];
      this.TemporalInformation = JSON.parse(analyzeEmailResponse.temporal_information)['JSON-LD']['@graph']['items'];
      this.WritePrint = JSON.parse(analyzeEmailResponse.write_print)['JSON-LD']['@graph'];

      for (let entry of JSON.parse(analyzeEmailResponse.write_print)['JSON-LD']['@graph']) {
        this.ReadAbilityIndexes = entry.readabilityIndexes;
        this.StructureIndexes = JSON.stringify(entry.structureIndexes);
      }

    });
  }


}

@Component({
  selector: 'calendar',
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.scss']
})
export class Calendar implements OnInit {
  CalendarEvents!: MatTableDataSource<CalendarEvent[]>;
  displayedColumns: string[] = ['title', 'participants', 'location', 'when', 'id'];
  clickedRows = new Set<CalendarEvent[]>();
  columnsToDisplay: string[] = new Array();  

  
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200, 250, 300,350, 400, 450, 500 ];
  pageLength: number = this.pageSizeOptions.length;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<CalendarEvent>;
  @ViewChild(MatSort) sort!: MatSort;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnsToDisplay, event.previousIndex, event.currentIndex )
  }

  applyFilter(event: Event) {
    const filterValue: any = (event.target as HTMLInputElement).value;
    this.CalendarEvents.filter = filterValue.trim().toLowerCase();
  }


  constructor(
     private _genesysService: GenesysService,
     private _appService: AppService,
     private _storageService: StorageService,
     public _dialog: Dialog,
     private _dialogRef: DialogRef,
     private _overlay: Overlay) {}

  
  ngOnInit () {
     this._appService.saveRouterURL();

     this.displayCalendarEvents();

     const head_tag = document.getElementsByTagName('head')[0];

     if (head_tag) {
      const elem  = document.createElement('script');
      elem.src = 'https://schedule.nylas.com/schedule-editor/v1.0/schedule-editor.js';

      const element = document.createElement('script');

       element.append(
         `

          document.querySelector('#schedule-editor').addEventListener('click', function () {

            nylas.scheduler.show({
              auth: {
                accessToken: window.sessionStorage.getItem('nylas_token'),
              },

              style: {
                tintColor: '#80e5a7',
                backgroundColor: '#f0f7ff',
              },

              defaults: {
                event: {
                  title: 'Add New Event',
                  duration: 30,
                },
              },
            });
          });
        
        `
       )

       head_tag.appendChild(elem);
      head_tag.appendChild(element);
     }
     for(let column of this.displayedColumns) {
      this.columnsToDisplay.push(column);
    }
  }


  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
  }


  displayCalendarEvents() {
    this._genesysService.getCalendarEvents({ token: window.sessionStorage.getItem('nylas_token')}).subscribe((response: any) => {
      this.CalendarEvents = response;
      this.CalendarEvents = new MatTableDataSource(response);
      this.CalendarEvents.paginator = this.paginator;
      this.paginator.page;
      this.CalendarEvents.sort = this.sort;
      this.paginator.pageIndex;

    });
  }


  showCalendar() {
    this._genesysService.getCalendar({ token: window.sessionStorage.getItem('nylas_token')}).subscribe((response: any) => {
      console.log(response);
    });
  }

  close() {
    this._dialogRef.close();
  }
  
}


export interface MsgBody {
  body: String
}

export interface ReplyDataset {
  from: String;
  body: String
}

export interface File {
  files: {
    content_type: String;
    filename: String;
    id: String;
  }
}





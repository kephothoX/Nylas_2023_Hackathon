import { Component, OnInit, ViewChild } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatTable } from '@angular/material/table';


import { Contact } from '../genesys';
import { GenesysService } from '../genesys.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  Contacts?: Contact[];
  displayedColumns: string[] = ['given_name', 'surname', 'email', 'id'];
  clickedRows = new Set<Contact[]>();
  columnsToDisplay: string[] = new Array();

  

  pageLength: number = 15;
  pageSize: number = 20;
  pageSizeOptions: number[] = [15, 30, 60, 120, 240, 480, 960];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<Contact>;
  @ViewChild(MatSort) sort!: MatSort;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnsToDisplay, event.previousIndex, event.currentIndex )
  }

  constructor(
    private _genesysService: GenesysService,
    private _appService: AppService
  ) {}


  ngOnInit(): void {
    this._appService.saveRouterURL();

    this._genesysService.getContacts({ token: window.sessionStorage.getItem('nylas_token')}).subscribe((response: any) => {
      this.Contacts = response;
      console.log(this.Contacts);
    });

    for(let column of this.displayedColumns) {
      this.columnsToDisplay.push(column);
    }
  }


  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
  }
}

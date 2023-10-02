import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'

import { ZuriService } from 'src/app/services/zuri.service';
import { StorageService } from '../storage.service';
import { MatSnackBar  } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent  {

  constructor (
    private _formBuilder: FormBuilder,
    private _zuriService: ZuriService,
    private _snackBar: MatSnackBar,
    private _storageService: StorageService
  ) {}

  nylasTokensForm = this._formBuilder.group({
    acct_email: ['', Validators.required],
    acct_token: ['', Validators.required]
  })


  onSubmit() {
    this._storageService.addUserToken({
      acct_email: this.nylasTokensForm.value.acct_email,
      acct_token: this.nylasTokensForm.value.acct_token,
      created_by: window.sessionStorage.getItem('_uid')
    });
  }

  resetForm() {
    this.nylasTokensForm.reset();
  }

}

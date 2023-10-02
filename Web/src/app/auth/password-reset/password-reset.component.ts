import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { getAuth, sendPasswordResetEmail,  GoogleAuthProvider } from "firebase/auth";


import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  visibility: string = 'hidden';
  disable_next: boolean = true;
  duration: string = '2000';
  email_address: string = '';

  Input_Type: string = 'password';

  _auth = getAuth(this._authService._app);
  _provider = new GoogleAuthProvider();


  toggleInputType(event: any) {
    event.preventDefault();
    if (this.Input_Type == 'password') {
      this.Input_Type ='text';
    } else {
      this.Input_Type = 'password';
    }
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    public _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this._snackBar.dismiss();

    if (this._auth.currentUser != null) {
      window.sessionStorage.setItem('is_logged_in', 'True');
      window.sessionStorage.setItem('user_email', `${this._auth.currentUser?.email}`);
      window.sessionStorage.setItem('_uid', `${this._auth.currentUser.uid}`);
      window.sessionStorage.setItem('active_user_name', `${this._auth.currentUser.displayName}`);

      if ( window.sessionStorage.getItem('_url_') != null || undefined ) {
        this._router.navigate([`${ window.sessionStorage.getItem('_url_')}`]);

      } else {
        this._router.navigate(['/genesys']);
      }
    }
  }
  
  resetPasswordForm = this._formBuilder.group({
    email: ['', Validators.required]
  })

  onSubmit() {
    sendPasswordResetEmail(this._auth, `${ this.resetPasswordForm.value.email }`)
  .then((response) => {
    console.log(response);
  })
  .catch((err: any) => {
    this._snackBar.open(`${err.code}, ${err.message}`, 'Close');
  });

  }

  resetForm() {
    this.resetPasswordForm.reset();
  }


}


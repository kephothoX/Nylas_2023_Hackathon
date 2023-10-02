import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service'
import { getAuth, RecaptchaVerifier, setPersistence, sendPasswordResetEmail, browserSessionPersistence, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signInWithPhoneNumber } from "firebase/auth";

import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],

})
export class SigninComponent implements AfterViewInit {
  visibility: string = 'hidden';
  disable_next: boolean = true;
  duration: string = '2000';
  email_address: string = '';

  Input_Type: string = 'password';

  _auth = getAuth(this._authService._app);
  _provider = new GoogleAuthProvider();

  windowRef: any;

  toggleInputType(event: any) {
    event.preventDefault();
    if (this.Input_Type == 'password') {
      this.Input_Type = 'text';
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

  ngAfterViewInit() {
    this.windowRef = new RecaptchaVerifier(this._auth, 'Recaptcha-Container');
    getAuth(this._authService._app).languageCode = 'it';
    this.windowRef.recaptchaVerifier = new RecaptchaVerifier(this._auth, 'Recaptcha-Container', {});

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



  signInForm = this._formBuilder.group({
    email_address: ['', Validators.required],
    password: ['',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]
    ]
  });

  async onPasswordSubmit() {
    let email: string = this.signInForm.value.email_address ? this.signInForm.value.email_address : '';
    this.email_address = email;
    let dataSet = {
      email: this.signInForm.value.email_address ? this.signInForm.value.email_address : '',
      password: this.signInForm.value.password ? this.signInForm.value.password : '',
    }

    setPersistence(this._auth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(this._auth, dataSet.email, dataSet.password)
          .then((userCredential: any) => {

            let user = userCredential.user;
            window.sessionStorage.setItem('user_email', `${user.email}`);
            window.sessionStorage.setItem('_uid', `${user.uid}`);
            window.sessionStorage.setItem('is_logged_in', 'False');
            window.sessionStorage.setItem('user_display_name', `${user.display_name}`);

            this._snackBar.open('Welcome', 'Close');

            if (window.sessionStorage.getItem('_url_') != null || undefined) {
              this._router.navigate([`${window.sessionStorage.getItem('_url_')}`]);

            } else {
              this._router.navigate(['/genesys']);
            }

          })
          .catch((err: any) => {

            this._snackBar.open(`${err.code}, ${err.message}`, 'Close');
          });
      });

  }

  loginWithGoogle() {
    setPersistence(this._auth, browserSessionPersistence)
      .then(() => {
        signInWithPopup(this._auth, this._provider)
          .then((result) => {
            let credential = GoogleAuthProvider.credentialFromResult(result);
            let user = result.user;

            window.sessionStorage.setItem('user_email', `${user.email}`);
            window.sessionStorage.setItem('_uid', `${user.uid}`);
            window.sessionStorage.setItem('user_display_name', `${user.displayName}`);
            window.sessionStorage.setItem('is_logged_in', 'True');

            this._snackBar.open(`Welcome, ${user.displayName}`, 'Close');


            if (window.sessionStorage.getItem('_url_') != null || undefined) {
              this._router.navigate([`${window.sessionStorage.getItem('_url_')}`]);

            } else {
              this._router.navigate(['/genesys']);
            }

          }).catch((error) => {

            let errorCode = error.code;
            let errorMessage = error.message;

            this._snackBar.open(`${errorCode} :  ${errorMessage}`, 'Close');

          });
      })
      .catch((err: any) => {

        this._snackBar.open(`${err.code}, ${err.message}`, 'Close');
      });
  }

}

import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppService } from 'src/app/services/app.service';

import { getAuth, RecaptchaVerifier, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signInWithPhoneNumber, createUserWithEmailAndPassword } from "firebase/auth";


import { AuthService } from '../../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Country } from 'src/app/interfaces/country';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements AfterViewInit {
  visibility: string = 'hidden';
  disable_next: boolean = true;
  duration: string = '2000';
  email_address: string = '';
  Countries?: Country[];
  Phone_Prefix?: string;

  Input_Type: string = 'password';

  _auth = getAuth(this._authService._app);
  _provider = new GoogleAuthProvider();

  windowRef: any;


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
    private _appService: AppService,
    private _router: Router,
    public _snackBar: MatSnackBar,
  ) { 
    setTimeout(() => {
      this._router.navigate(['/auth/signin']); 
    });
  }

  ngAfterViewInit() {
    this._appService.getCountryCodes().subscribe((result: any) => {
      this.Countries = result;
    });

    getAuth(this._authService._app).languageCode = 'it';

  }

  signUpForm = this._formBuilder.group({
    displayName: ['', Validators.required],
    photoURL: ['', Validators.required],
    email: ['', Validators.required],
    password: ['',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]
    ],
    phoneNumber: ['', Validators.required],
    country: ['', Validators.required]

  });


  getCountryPrefix(prefix: string) {
    this.Phone_Prefix = prefix;
  }



  onsignUpSubmit() {
    let _user = this.signUpForm.value;

    let dataSet = {
      displayName: this.signUpForm.value.displayName ? this.signUpForm.value.displayName : '',
      email: this.signUpForm.value.email ? this.signUpForm.value.email : '',
      password: this.signUpForm.value.password ? this.signUpForm.value.password : '',
      phoneNumber: this.signUpForm.value.phoneNumber ? this.signUpForm.value.phoneNumber : '',
      photoURL: this.signUpForm.value.photoURL ? this.signUpForm.value.photoURL : '',
    }

    createUserWithEmailAndPassword(this._auth, dataSet.email, dataSet.password)
      .then((userCredential: any) => {

        let user = userCredential.user;

        console.log(user);

        window.sessionStorage.setItem('user_email', `${user.email}`);
        window.sessionStorage.setItem('active_user_token', `${user.accessToken}`);

        this._snackBar.open(`Welcome, ${user.metadata.name}`, 'Close');


        if (window.sessionStorage.getItem('_url_') != null || undefined) {
          this._router.navigate([`${window.sessionStorage.getItem('_url_')}`]);

        } else {
          this._router.navigate(['/genesys']);
        }

      })
      .catch((err: any) => {

        this._snackBar.open(`${err.code}, ${err.message}`, 'Close');
        let errorCode = err.code;
        let errorMessage = err.message;

      });


  }

  resetForm() {
    this.signUpForm.reset();
  }

}

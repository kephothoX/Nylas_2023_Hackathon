import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { getAuth, GoogleAuthProvider, onAuthStateChanged  } from 'firebase/auth';
import { AuthService } from './auth/auth.service';
import { StorageService } from './genesys/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Zuri';
  authEmail: any

  _auth = getAuth(this._authService._app);
  _provider = new GoogleAuthProvider();

  windowRef: any;

  
  constructor (
    private _router: Router,
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    private _storageService: StorageService
  ) {}


  ngOnInit(): void {
    onAuthStateChanged(this._auth, (user) => {

      if (user) {
        this.authEmail = user.email;
        this._storageService.getUserTokens(`${user.email}`);
        this._snackBar.open(`Welcome ${user.displayName}`, 'Close');


        if (window.sessionStorage.getItem('_url_') != null || undefined) {
          this._router.navigate([`${window.sessionStorage.getItem('_url_')}`]);

        } else {
          this._router.navigate(['/genesys']);
        }

      } else {

        window.sessionStorage.removeItem('is_logged_in');
        window.sessionStorage.removeItem('user_email');
        window.sessionStorage.removeItem('user_display_name');
        window.sessionStorage.removeItem('nylas_token');

        this._router.navigate(['/auth/signin']);
  
      }
    });

    if (window.sessionStorage.getItem('nylas_token') == null || undefined) {
      this._snackBar.open('You have no Active Account on Nylas', 'Close');
    }

  }
}

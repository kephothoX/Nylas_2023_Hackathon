import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from 'src/app/auth/auth.service';
import { getAuth, signOut } from "firebase/auth";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title?: string;

  authEmail: any = window.sessionStorage.getItem('user_email');

  _auth = getAuth(this._authService._app);

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar,
  ) {  }

  ngOnInit(): void {
    if (this._router.routerState.snapshot.url == '/auth/signup' || '/auth/signin') {
      this.authEmail == null;
    } else {
      this.authEmail = window.sessionStorage.getItem('user_email');
    }
  }

  logOutUser() {
    signOut(this._auth).then(() => {
      window.sessionStorage.removeItem('is_logged_in');
      window.sessionStorage.removeItem('user_email');
      window.sessionStorage.removeItem('user_display_name');
      window.sessionStorage.removeItem('nylas_token');
      
      this._router.navigate(['/auth/signin']);
    }).catch((err: any) => {
      
      this._snackBar.open(`${ err }`, 'Close');
    });
    
  }

}

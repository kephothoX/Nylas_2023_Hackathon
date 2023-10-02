import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, catchError, of } from 'rxjs';

import { User, UserCredentials } from '../interfaces/user';

import { ErrorService } from '../services/error.service';
import { AppService } from '../services/app.service';

import { AdminUser } from 'src/app/interfaces/user';

import { initializeApp } from 'firebase/app';
import { getAuth  } from 'firebase/auth';


import {
  persistentLocalCache,
  persistentMultipleTabManager,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  initializeFirestore,
  serverTimestamp,
} from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseConfig = {
    apiKey: "AIzaSyDv0Nz0N6faQLCzTmG3sIxqqbL79mdwxGo",
    authDomain: "zuri-genesys.firebaseapp.com",
    projectId: "zuri-genesys",
    storageBucket: "zuri-genesys.appspot.com",
    messagingSenderId: "190762699167",
    appId: "1:190762699167:web:aba719ff8ea24e559055aa",
    measurementId: "G-KHTP2FB9LV" 
  };

  _app = initializeApp(this.firebaseConfig);

  _db = initializeFirestore(this._app,
    {
      localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
    },
  );

  constructor(
    private _errorService: ErrorService,
    private _httpClient: HttpClient,
    private _router: Router,
    private _appService: AppService,
  ) { }

  newSquareCustomer(user: any): Observable<any> {
    return this._httpClient.post(`${this._appService.apiUrl}/newSquareCustomer`, user, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  AuthFlowStart(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.apiUrl}/auth/start/auth/flow`, {
      email: data.email,
    }, this._appService.httpOptions).pipe(catchError(this._errorService.handleError))

  }

  CompleteUserSignUp(data: any) {
    //const enc_key: string = CryptoJS.enc.Base64.parse(`${data.email_address}`).toString();
    const user_password: string = `${data.password}`;

    const dataSet = {
      flow_id: data.flow_id,
      first_name: data.first_name,
      last_name: data.last_name,
      password: data.password
    };
  }


  NewUser(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.apiUrl}/auth/new`, {
      email: data.email,
      password: data.password
    }, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  UpdateUser(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.apiUrl}/auth/update`, {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      password: data.password
    }, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  GetUserByEmail(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.apiUrl}/auth/user`, {
      email: data.email
    }, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

   GetUserById(id: any): Observable<any> {
    return this._httpClient.get(`${this._appService.apiUrl}/auth/user/${ id }`, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }


  VerifyUser(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.apiUrl}/auth/verify/user`, {
      email: data.email,
      password: data.password
    }, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));

  }


  VerifyPassword(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.apiUrl}/auth/verify/password`, {
      flow_id: data.flow_id,
      password: data.password
    },
      this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  VerifyEmail(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.apiUrl}/auth/verify/email`, {
      flow_id: data.flow_id,
      email: data.email
    }, this._appService.httpOptions)
  }

  StartMFAEnrollment(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.apiUrl}/auth/enroll/MFA/start`, {
      flow_id: data.flow_id,
    },
      this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }


  CompleteMFAEnrollment(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.apiUrl}/auth/enroll/MFA/complete`, {
      flow_id: data.flow_id,
      otp_code: data.otp_code
    }, this._appService.httpOptions);
  }

  VerifyMFAComplete(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.apiUrl}/auth/verify/MFA/complete`, {
      flow_id: data.flow_id,
      otp_code: data.otp_code
    }, this._appService.httpOptions);
  }

  GetFlowState(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.apiUrl}/auth/get/flow/state`, {
      flow_id: data.flow_id,
    }, this._appService.httpOptions);
  }

  StartMFAVerification(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.apiUrl}/auth/start/MFA/verification`, {
      flow_id: data.flow_id,
    }, this._appService.httpOptions);
  }

  FlowComplete(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.apiUrl}/auth/flow/complete`, {
      flow_id: data.flow_id,
    }, this._appService.httpOptions);
  }

  PasswordLogin(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.apiUrl}/auth/password/login`, {
      email: data.email,
      password: data.password
    }, this._appService.httpOptions);
  }

  ResetPassword(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.apiUrl}/auth/reset/password`, {
      data,
    }, this._appService.httpOptions);
  }

  AuditLog(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.apiUrl}/audit/log`, {
      data,
    }, this._appService.httpOptions);
  }

  CheckEmailBreach(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.apiUrl}/intel/email`, {
      email: data.email,
    }, this._appService.httpOptions);
  }

  Logout(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.apiUrl}/auth/logout`, {
      token: data.token
    }, this._appService.httpOptions);
  }

  UpdateUserPassword(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.apiUrl}/auth/update/password`, {
      token: data.token,
      old_password: data.old_password,
      new_password: data.new_password
    }, this._appService.httpOptions);
  }

  NewAuthUser(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.apiUrl}/auth/users/new`, data, this._appService.httpOptions)
  }

  UpdateAuthUser(data: any): Observable<any> {
    return this._httpClient.put(`${this._appService.apiUrl}/auth/users/update`, data, this._appService.httpOptions)
  }

  GetAuthUser(data: any): Observable<any> {
    return this._httpClient.get(`${this._appService.apiUrl}/auth/users/${ data.auth_id }`, this._appService.httpOptions)
  }

  GetAuthUsers(): Observable<any> {
    return this._httpClient.get(`${this._appService.apiUrl}/auth/users`, this._appService.httpOptions)
  }

  VerifyCaptcha(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.apiUrl}/auth/captcha/verify`, data, this._appService.httpOptions)
  }

  GenerateNewAuthToken(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.apiUrl }/auth/token/new`, data, this._appService.httpOptions ).pipe(catchError(this._errorService.handleError));
  }

  DecodeToken(token: String): Observable<any> {
    return this._httpClient.post(`${ this._appService.apiUrl }/auth/decode`, token, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  updateUserProfile(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.apiUrl }/auth/update/user/profile`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }



  /*async saveAdminUser(userData: AdminUser) {
    const enc_key: string = CryptoJS.enc.Base64.parse(`${userData.email_address}`).toString();
    const user_password: string = `${userData.password}`;

    const adminUser = {
      id: self.crypto.randomUUID().toString().toUpperCase(),
      given_name: userData.given_name,
      family_name: userData.family_name,
      phone_number: userData.phone_number,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      email_address: userData.email_address,
      password: CryptoJS.AES.encrypt(user_password, enc_key).toString(),
      isActive: false,
      isAuthorizedAdmin: false,
    };

    try {
      const docRef = doc(this.db, 'AdminUser', `${userData.email_address}`);
      await setDoc(docRef, adminUser, { merge: true });

    } catch (err: any) {
      console.log('Error Writting document', err);
    }

  }

  */


  getLocationId(): Observable<any> {
    return this._httpClient.get(`${this._appService.apiUrl}/getSquareMainLocation`, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getuserByEmailAddress(email: string): Observable<any> {

    const qs = {
      "limit": 1,
      "query": {
        "filter": {
          "email_address": {
            "exact": email
          }
        }
      }
    };

    return this._httpClient.post(`${this._appService.apiUrl}/getSquareCustomerByEmail`, qs, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }


  /*async loginUser(data: UserCredentials) {
    const enc_key = CryptoJS.enc.Base64.parse(`${data.email_address}`).toString();
    const docRef = doc(this.db, 'UserCredentials', `${data.email_address}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const docData = docSnap.data();
      const pass: string = docData['password'];


      if (data.password == CryptoJS.AES.decrypt(docData['password'], CryptoJS.enc.Base64.parse(`${data.email_address}`).toString()).toString(CryptoJS.enc.Utf8)) {
        setTimeout(async () => {
          await updateDoc(docRef, { isActive: true });

          this.getuserByEmailAddress(`${data.email_address}`).subscribe((result: any) => {
            window.sessionStorage.setItem('auth_login_status', docData['isActive']);
            window.sessionStorage.setItem('customer_id', result.customers[0].id);
            window.sessionStorage.setItem('customer_email_address', result.customers[0].email_address);

          });

        });

        setTimeout(() => {
          this._router.navigate(['/selfcare']);
        }, 1000);

        return 'Subscribe to your preffered package.'

      } else {
        return "Wrong Credentials, Passwords didn't match.";

      }

    } else {
      return 'No user exists, with those Credentials.';

    }
  }

  async loginAdmin(data: UserCredentials) {
    const enc_key = CryptoJS.enc.Base64.parse(`${data.email_address}`).toString();
    const docRef = doc(this.db, 'AdminUser', `${data.email_address}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const docData = docSnap.data();
      const pass: string = docData['password'];

      if (data.password == CryptoJS.AES.decrypt(docData['password'], CryptoJS.enc.Base64.parse(`${data.email_address}`).toString()).toString(CryptoJS.enc.Utf8)) {
        await updateDoc(docRef, { isActive: true });

        window.sessionStorage.setItem('canLoginAsAdmin', docData['isAuthorizedAdmin']);

        setTimeout(() => {
          this._router.navigate(['/admin']);
        });

        return 'Now Logged In As Admin'

      } else {
        return "Wrong Credentials, Passwords didn't match.";

      }

    } else {
      return 'No user exists, with those Credentials.';

    }
  }

  */

  isAdminLoggedIn(): boolean {
    const status =  Boolean(window.sessionStorage.getItem('canLoginAsAdmin'));

    if (status == true) {
      return true;
    } else {

      setTimeout(() => {
        this._router.navigate(['/admin/auth/signin']);
      });

      return false;
    }
  }

  isUserLoggedIn(): boolean {
    const status = Boolean(window.sessionStorage.getItem('auth_login_status'));

    if (status == true) {
      return true;
    } else {

      setTimeout(() => {
        this._router.navigate(['/auth/signin']);
      });

      return false;
    }
  }
}

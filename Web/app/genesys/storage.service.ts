import { Injectable } from '@angular/core';

import { initializeApp } from 'firebase/app';
import { getStorage, ref } from "firebase/storage";


import { MatSnackBar } from '@angular/material/snack-bar';

import {
  persistentLocalCache,
  persistentMultipleTabManager,
  doc,
  setDoc,
  getDoc,
  initializeFirestore,
} from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
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

  _db = initializeFirestore(this._app, { localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })});


  _storage = getStorage(this._app);
  _storageRef = ref(this._storage, 'some-child');


  constructor(
    private _snackBar: MatSnackBar,
  ) { }

  async addUserToken(data: any) {
    try {
      const docRef = doc(this._db, 'NylasTokens', `${data.acct_email}`);
      await setDoc(docRef, data, { merge: true });

    } catch (err: any) {
      this._snackBar.open('Error Writting document', 'Close');
    }

  }

  async getUserTokens(email: String) {
    let docRef = doc(this._db, 'NylasTokens', email.toString());
    let docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let docData = docSnap.data();

      if(email == docData['acct_email']) {
        window.sessionStorage.setItem('nylas_token', `${ docData['acct_token']}`);
      } else {
        this._snackBar.open('No Nylas Token with your Email', 'Close');
      }
      
    } else {
      this._snackBar.open('No Nylas Tokens Yet', 'Close');

      window.location.reload();
    }
  }  

}

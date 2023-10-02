import { Injectable } from '@angular/core';
import speech from "@google-cloud/speech"

@Injectable({
  providedIn: 'root'
})
export class GoogleSpeechService {
  client = new speech.SpeechClient({
   
  });

  constructor() { }
}

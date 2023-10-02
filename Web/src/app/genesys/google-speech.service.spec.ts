import { TestBed } from '@angular/core/testing';

import { GoogleSpeechService } from './google-speech.service';

describe('GoogleSpeechService', () => {
  let service: GoogleSpeechService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleSpeechService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

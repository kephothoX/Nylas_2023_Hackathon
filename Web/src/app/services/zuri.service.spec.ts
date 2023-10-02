import { TestBed } from '@angular/core/testing';

import { ZuriService } from './zuri.service';

describe('ZuriService', () => {
  let service: ZuriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZuriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

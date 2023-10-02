import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenesysComponent } from './genesys.component';

describe('GenesysComponent', () => {
  let component: GenesysComponent;
  let fixture: ComponentFixture<GenesysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenesysComponent]
    });
    fixture = TestBed.createComponent(GenesysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FingerReadComponent } from './finger-read.component';

describe('FingerReadComponent', () => {
  let component: FingerReadComponent;
  let fixture: ComponentFixture<FingerReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FingerReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FingerReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

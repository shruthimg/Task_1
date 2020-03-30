import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceFieldComponent } from './reference-field.component';

describe('ReferenceFieldComponent', () => {
  let component: ReferenceFieldComponent;
  let fixture: ComponentFixture<ReferenceFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetInvolvedPage } from './get-involved.page';

describe('GetInvolvedPage', () => {
  let component: GetInvolvedPage;
  let fixture: ComponentFixture<GetInvolvedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetInvolvedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetInvolvedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

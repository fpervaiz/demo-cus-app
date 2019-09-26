import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteePage } from './committee.page';

describe('CommitteePage', () => {
  let component: CommitteePage;
  let fixture: ComponentFixture<CommitteePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitteePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitteePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

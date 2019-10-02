import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsModalPage } from './news-modal.page';

describe('NewsModalPage', () => {
  let component: NewsModalPage;
  let fixture: ComponentFixture<NewsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

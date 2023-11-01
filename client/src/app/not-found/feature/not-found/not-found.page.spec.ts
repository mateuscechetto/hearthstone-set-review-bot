import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundPage } from './not-found.page';

describe('NotFoundComponent', () => {
  let component: NotFoundPage;
  let fixture: ComponentFixture<NotFoundPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundPage]
    });
    fixture = TestBed.createComponent(NotFoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundPage } from './not-found.page';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

const activatedRouteMock = {
  snapshot: {
    params: { username: of('molino_hs') }
  },
}

describe('NotFoundComponent', () => {
  let component: NotFoundPage;
  let fixture: ComponentFixture<NotFoundPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ]
    });
    fixture = TestBed.createComponent(NotFoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

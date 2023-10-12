import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardViewPage } from './card-view.page';

describe('CardViewComponent', () => {
  let component: CardViewPage;
  let fixture: ComponentFixture<CardViewPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardViewPage]
    });
    fixture = TestBed.createComponent(CardViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

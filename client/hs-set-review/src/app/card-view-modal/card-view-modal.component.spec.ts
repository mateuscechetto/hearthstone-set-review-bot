import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardViewModalComponent } from './card-view-modal.component';

describe('CardViewModalComponent', () => {
  let component: CardViewModalComponent;
  let fixture: ComponentFixture<CardViewModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardViewModalComponent]
    });
    fixture = TestBed.createComponent(CardViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgRatingTableComponent } from './avg-rating-table.component';

describe('AvgRatingTableComponent', () => {
  let component: AvgRatingTableComponent;
  let fixture: ComponentFixture<AvgRatingTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AvgRatingTableComponent]
    });
    fixture = TestBed.createComponent(AvgRatingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

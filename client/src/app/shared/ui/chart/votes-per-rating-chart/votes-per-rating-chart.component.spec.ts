import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesPerRatingChartComponent } from './votes-per-rating-chart.component';

describe('VotesPerRatingChartComponent', () => {
  let component: VotesPerRatingChartComponent;
  let fixture: ComponentFixture<VotesPerRatingChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VotesPerRatingChartComponent]
    });
    fixture = TestBed.createComponent(VotesPerRatingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

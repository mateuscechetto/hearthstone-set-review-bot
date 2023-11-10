import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsPage } from './stats.page';

describe('StatsPage', () => {
  let component: StatsPage;
  let fixture: ComponentFixture<StatsPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsPage]
    });
    fixture = TestBed.createComponent(StatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

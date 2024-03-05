import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGridSkeletonComponent } from './card-grid-skeleton.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CardGridSkeletonComponent', () => {
  let component: CardGridSkeletonComponent;
  let fixture: ComponentFixture<CardGridSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardGridSkeletonComponent, RouterTestingModule]
    });
    fixture = TestBed.createComponent(CardGridSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

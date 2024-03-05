import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsPage } from './stats.page';
import { UserService } from '../../shared/data-access/user/user.service';
import { StatsService } from '../data-access/stats.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

const userServiceMock = {
  getUserByUsername: jest.fn((username) => of({ name: 'molino_hs', image: '', isStreamer: true })),
  getUser: jest.fn(() => of({ name: 'molino_hs', image: '', isStreamer: true })),
  userIsStreamer: jest.fn(() => of(true)),
}

const statsServiceMock = {
  getCards: jest.fn(() => of([])),
  getAverageRatingsByClass: jest.fn(() => of([])),
  loadingCards: {
    pipe: jest.fn(() => of(true))
  },
  loadingAvgRatingByClass: {
    pipe: jest.fn(() => of(true))
  }
}

const activatedRouteMock = {
  snapshot: {
    params: { username: of('molino_hs') }
  },
}

describe('StatsPage', () => {
  let component: StatsPage;
  let fixture: ComponentFixture<StatsPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: StatsService, useValue: statsServiceMock },
      ]
    });
    fixture = TestBed.createComponent(StatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

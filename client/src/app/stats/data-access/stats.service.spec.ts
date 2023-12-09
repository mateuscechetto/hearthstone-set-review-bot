import { TestBed } from '@angular/core/testing';

import { StatsService } from './stats.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CardService', () => {
  let service: StatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(StatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

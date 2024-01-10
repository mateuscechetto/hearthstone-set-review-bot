import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ExpansionService } from './expansion.service';

describe('ExpansionService', () => {
  let service: ExpansionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ExpansionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

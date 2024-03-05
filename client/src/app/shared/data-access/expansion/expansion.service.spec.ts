import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ExpansionService } from './expansion.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ExpansionService', () => {
  let service: ExpansionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(ExpansionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

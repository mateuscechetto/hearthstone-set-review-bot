import { TestBed } from '@angular/core/testing';

import { CardService } from './card.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CardService', () => {
  let service: CardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

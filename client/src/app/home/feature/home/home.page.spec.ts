import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


const activatedRouteMock = {
  snapshot: {
    params: { username: of('molino_hs') }
  },
}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ]
    });
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyRedirectComponent } from './dummy-redirect.component';

describe('DummyRedirectComponent', () => {
  let component: DummyRedirectComponent;
  let fixture: ComponentFixture<DummyRedirectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DummyRedirectComponent]
    });
    fixture = TestBed.createComponent(DummyRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

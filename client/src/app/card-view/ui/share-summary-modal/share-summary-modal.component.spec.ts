import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareSummaryModalComponent } from './share-summary-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ShareSummaryModalComponent', () => {
  let component: ShareSummaryModalComponent;
  let fixture: ComponentFixture<ShareSummaryModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(ShareSummaryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

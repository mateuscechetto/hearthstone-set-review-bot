import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordChatComponent } from './record-chat.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('RecordChatComponent', () => {
  let component: RecordChatComponent;
  let fixture: ComponentFixture<RecordChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    fixture = TestBed.createComponent(RecordChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

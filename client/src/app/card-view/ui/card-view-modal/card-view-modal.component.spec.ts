import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardViewModalComponent } from './card-view-modal.component';
import { By } from '@angular/platform-browser';
import { cardsMock } from '../../../mockData/cards.mock';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CardViewModalComponent', () => {
  let component: CardViewModalComponent;
  let fixture: ComponentFixture<CardViewModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule]
    });
    fixture = TestBed.createComponent(CardViewModalComponent);
    component = fixture.componentInstance;
    component.card = cardsMock[0];
    component.shouldShowModal = true;
    component.streamerView = true;
    component.isUserStreamer = true;
    component.cardToDisplay = cardsMock[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show record chat button when it is pre-expansion season', () => {
    const recordChatButton = fixture.debugElement.query(
      By.css('[data-testid="record-chat-button"]')
    );

    expect(recordChatButton).toBeTruthy();

  });

  it('should NOT show record chat button when it is not pre-expansion season', () => {
    component.isInPreExpansionSeason = false;
    component.card = cardsMock[0];
    component.shouldShowModal = true;
    component.isUserStreamer = true;
    component.streamerView = true;
    component.cardToDisplay = cardsMock[0];
    fixture.detectChanges();
    const recordChatButton = fixture.debugElement.query(
      By.css('[data-testid="record-chat-button"]')
    );
    expect(recordChatButton).toBeFalsy();
  });

});

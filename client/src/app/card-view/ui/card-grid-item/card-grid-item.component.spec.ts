import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { cardsMock } from '../../../mockData/cards.mock';
import { CardGridItemComponent } from './card-grid-item.component';



describe('CardGridItemComponent', () => {
  let component: CardGridItemComponent;
  let fixture: ComponentFixture<CardGridItemComponent>;

  beforeEach(() => {

    fixture = TestBed.createComponent(CardGridItemComponent);
    component = fixture.componentInstance;
    component.card = cardsMock[0];
    component.streamerView = true;
    component.isUserStreamer = true;
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
    component.isUserStreamer = true;
    component.streamerView = true;
    fixture.detectChanges();
    const recordChatButton = fixture.debugElement.query(
      By.css('[data-testid="record-chat-button"]')
    );
    expect(recordChatButton).toBeFalsy();
  });

});

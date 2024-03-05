import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardViewPage } from './card-view.page';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { cardsMock } from '../../../mockData/cards.mock';
import { of } from 'rxjs';
import { CardService } from '../../data-access/card/card.service';
import { UserService } from '../../../shared/data-access/user/user.service';
import { RatingService } from '../../data-access/rating/rating.service';
import { EnvironmentService } from '../../../shared/environment/environment.service';
import { CURRENT_EXPANSION, ExpansionService } from '@app/shared/data-access/expansion/expansion.service';

const serviceMock = {
  getCards: jest.fn(() => of(cardsMock.map(card => ({ ...card, rating: 2 })))),
  loading: {
    pipe: jest.fn(() => of(false))
  }
}

const userServiceMock = {
  getUserByUsername: jest.fn((username) => of({ name: 'molino_hs', image: '', isStreamer: true })),
  getUser: jest.fn(() => of({ name: 'molino_hs', image: '', isStreamer: true })),
  userIsStreamer: jest.fn(() => of(true)),
  loggedUser: of({ name: 'molino_hs', image: '',  isStreamer: true }),
}

const ratingServiceMock = {}

const activatedRouteMock = {
  params: of({ username: 'molino_hs'}),
  queryParams: of({ expansion: 'mock_expansion' })
}

const environmentServiceMock = {
  isInPreExpansionSeason: jest.fn(() => true),
}

const expansionServiceMock = {
  activeExpansion: of(CURRENT_EXPANSION),
}

describe('CardViewComponent', () => {
  let component: CardViewPage;
  let fixture: ComponentFixture<CardViewPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: CardService, useValue: serviceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: RatingService, useValue: ratingServiceMock },
        { provide: EnvironmentService, useValue: environmentServiceMock },
        { provide: ExpansionService, useValue: expansionServiceMock }
      ]
    });
    userServiceMock.loggedUser = of({ name: 'molino_hs', image: '', isStreamer: true });
    fixture = TestBed.createComponent(CardViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show hide chat ratings button when it is pre-expansion season and user is a streamer', () => {
    const recordChatButton = fixture.debugElement.query(
      By.css('[data-testid="record-chat-ratings-button"]')
    );
    const hideChatButton = fixture.debugElement.query(
      By.css('[data-testid="hide-chat-ratings-button"]')
    );
    const message = fixture.debugElement.query(
      By.css('[data-testid="not-pre-expansion-message"]')
    );

    expect(recordChatButton).toBeFalsy();
    expect(hideChatButton).toBeTruthy();
    expect(message).toBeFalsy();
  });

  it('should show record chat ratings button when it is pre-expansion season and user is NOT a streamer', () => {
    userServiceMock.loggedUser = of({ name: 'molino_hs', image: '', isStreamer: false });
    fixture = TestBed.createComponent(CardViewPage);
    fixture.detectChanges();

    const recordChatButton = fixture.debugElement.query(
      By.css('[data-testid="record-chat-ratings-button"]')
    );
    const hideChatButton = fixture.debugElement.query(
      By.css('[data-testid="hide-chat-ratings-button"]')
    );
    const message = fixture.debugElement.query(
      By.css('[data-testid="not-pre-expansion-message"]')
    );

    expect(recordChatButton).toBeTruthy();
    expect(hideChatButton).toBeFalsy();
    expect(message).toBeFalsy();
  });

  it('should NOT show record chat ratings button when it is not pre-expansion season', () => {
    jest.spyOn(environmentServiceMock, 'isInPreExpansionSeason').mockReturnValueOnce(false);
    fixture = TestBed.createComponent(CardViewPage);
    fixture.detectChanges();

    const recordChatButton = fixture.debugElement.query(
      By.css('[data-testid="record-chat-ratings-button"]')
    );
    const hideChatButton = fixture.debugElement.query(
      By.css('[data-testid="hide-chat-ratings-button"]')
    );
    const message = fixture.debugElement.query(
      By.css('[data-testid="not-pre-expansion-message"]')
    );

    expect(recordChatButton).toBeFalsy();
    expect(hideChatButton).toBeFalsy();
    expect(message).toBeTruthy();
  });

});

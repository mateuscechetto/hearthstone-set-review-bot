import { AsyncPipe, JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { switchMap, tap } from 'rxjs';
import { RatingService } from '@card-view/data-access/rating/rating.service';
import { UserService } from '@shared/data-access/user/user.service';
import { User } from '@shared/models/user';
import { HearthstoneClass, RatedCard } from '@shared/models/hs-card';
import { CardService } from '@card-view/data-access/card/card.service';
import { CardGridItemComponent } from '@card-view/ui/card-grid-item/card-grid-item.component';
import { CardViewModalComponent } from '@card-view/ui/card-view-modal/card-view-modal.component';
import { EnvironmentService } from '@shared/environment/environment.service';
import {
  CURRENT_EXPANSION,
  ExpansionService,
} from '@shared/data-access/expansion/expansion.service';
import { RATED_CARDS_MOCK } from '@card-view/feature/card-view/card-view-data.mock';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PossessivePipe } from '@app/shared/pipes/possessive.pipe';
import { ShareSummaryModalComponent } from '@app/card-view/ui/share-summary-modal/share-summary-modal.component';
import { VotesPerRatingChartComponent } from '@shared/ui/chart/votes-per-rating-chart/votes-per-rating-chart.component';
import { AccordionModule } from 'primeng/accordion';
import { CombineCardsPipe } from '@shared/pipes/combine-cards-array.pipe';
import { AvgRatingTableComponent } from '@app/card-view/ui/avg-rating-table/avg-rating-table.component';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.page.html',
  styleUrls: ['./card-view.page.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ButtonModule,
    DataViewModule,
    SharedModule,
    CardGridItemComponent,
    CardViewModalComponent,
    NgClass,
    RouterLink,
    AsyncPipe,
    AutoCompleteModule,
    ReactiveFormsModule,
    JsonPipe,
    PossessivePipe,
    ShareSummaryModalComponent,
    VotesPerRatingChartComponent,
    AccordionModule,
    CombineCardsPipe,
    AvgRatingTableComponent,
  ],
})
export class CardViewPage {
  layout: 'list' | 'grid' = 'grid';
  shouldShowModal = false;
  modalCard?: RatedCard;
  cards!: RatedCard[];
  loggedUser: User | null = null;
  pageUser: User | undefined;
  shouldShowShareModal = false;

  CURRENT_EXPANSION = CURRENT_EXPANSION;

  activeExpansion = this.expansionService.activeExpansion;

  loggedUser$ = this.userService.loggedUser;

  loadingCards$ = this.service.loading.pipe();

  isInPreExpansionSeason: boolean = false;

  compareReviewOptions = this.userService.users.pipe();
  suggestions: string[] = [];
  compareReviewsForm: FormGroup = this.fb.group({
    reviewers: [],
  });

  compareReviewersFormChanges$ = this.compareReviewsForm.controls[
    'reviewers'
  ].valueChanges.pipe(
    tap((reviewers) =>
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { compareTo: reviewers },
        queryParamsHandling: 'merge',
      })
    )
  );

  reviewersToCompare$ = this.route.queryParams.pipe(
    tap((params: Params) => {
      let reviewers = params['compareTo'];
      if (typeof reviewers === 'string') {
        reviewers = [reviewers];
      }
      this.compareReviewsForm.patchValue(
        { reviewers: reviewers },
        { emitEvent: false }
      );
    }),
    switchMap((params: Params) => {
      const reviewers = params['compareTo'];
      return this.service.getCompareReviewersCards(reviewers);
    })
  );

  constructor(
    private service: CardService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private ratingService: RatingService,
    private environment: EnvironmentService,
    private expansionService: ExpansionService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isInPreExpansionSeason = this.environment.isInPreExpansionSeason();
    this.cards = RATED_CARDS_MOCK;

    this.compareReviewersFormChanges$.subscribe();

    this.route.params
      .pipe(
        switchMap(({ username }) =>
          this.userService.getUserByUsername(username)
        ),
        tap((pageUser) => (this.pageUser = pageUser)),
        switchMap((pageUser) => this.service.getCards(pageUser.name)),
        tap(
          (cards) =>
            (this.cards = this.sortCardsByClassAndMana(
              cards.map((card) => ({
                ...card.card,
                rating: card.rating,
                chatRating: card.chatRating,
              }))
            ))
        )
      )
      .subscribe();

    this.loggedUser$.subscribe({
      next: (user) => {
        this.loggedUser = user;
      },
      error: (_) => (this.loggedUser = null),
    });
  }

  searchUser(event: AutoCompleteCompleteEvent, users: User[]) {
    this.suggestions = users
      .filter((user) =>
        user.name.toLowerCase().includes(event.query.toLowerCase())
      )
      .map((u) => u.name);
  }

  showModal(card: RatedCard) {
    this.modalCard = card;
    this.shouldShowModal = true;
  }

  changeCard(event: number) {
    const index = this.cards.findIndex((c) => c.name == this.modalCard?.name);
    this.modalCard = this.cards[index + event] || this.modalCard;
  }

  changedCardRate(event: number) {
    const card = this.cards.find((c) => c.name == this.modalCard?.name);
    if (card) {
      const copy = { ...card };
      copy.rating = event;
      this.cards = this.sortCardsByClassAndMana(
        this.cards.map((c) => (c.name == copy.name ? copy : c))
      );
    }
  }

  onChangedRate({ rating, card }: { rating: number; card: RatedCard }) {
    if (!this.loggedUser) {
      return;
    }
    this.ratingService
      .rateCard(card.name, rating, this.userService.getUserToken())
      .subscribe((_) => {
        this.cards = this.sortCardsByClassAndMana(
          this.cards.map((c) =>
            c.name == card.name ? { ...c, rating: rating } : c
          )
        );
      });
  }

  onShowChatRatings(): void {
    if (this.loggedUser) {
      this.userService.userIsStreamer(this.loggedUser.name).subscribe({
        next: (loggedUser) => {
          this.loggedUser = loggedUser;

          if (this.pageUser?.name == this.loggedUser?.name) {
            this.pageUser = loggedUser;
          }
        },
        error: (e) => console.log(e),
      });
    }
  }

  onHideChatRatings(): void {
    if (this.loggedUser) {
      this.userService.userIsNOTStreamer(this.loggedUser.name).subscribe({
        next: (loggedUser) => {
          this.loggedUser = loggedUser;

          if (this.pageUser?.name == this.loggedUser?.name) {
            this.pageUser = loggedUser;
          }
        },
        error: (e) => console.log(e),
      });
    }
  }

  onRecordChat(card: RatedCard) {
    if (this.loggedUser) {
      this.ratingService
        .recordChat(card.name, this.userService.getUserToken())
        .subscribe({
          next: (_) => {},
          error: (e) => console.log(e),
        });
    }
  }

  onStopRecording(card: RatedCard) {
    if (this.loggedUser) {
      this.ratingService
        .stopRecording(card.name, this.userService.getUserToken())
        .subscribe({
          next: (ratedCard) => {
            this.cards = this.sortCardsByClassAndMana(
              this.cards.map((c) =>
                c.name == card.name
                  ? { ...c, chatRating: ratedCard.chatRating }
                  : c
              )
            );
            if (this.modalCard?.name) {
              this.modalCard = this.cards.find(
                (card) => card.name === this.modalCard?.name
              );
            }
          },
          error: (e) => console.log(e),
        });
    }
  }

  sortCardsByClassAndMana(cards: RatedCard[]): RatedCard[] {
    return cards.slice().sort((a, b) => {
      if (
        a.hsClass === HearthstoneClass.NEUTRAL &&
        b.hsClass !== HearthstoneClass.NEUTRAL
      ) {
        return 1; // 'NEUTRAL' is greater than any other class
      } else if (
        a.hsClass !== HearthstoneClass.NEUTRAL &&
        b.hsClass === HearthstoneClass.NEUTRAL
      ) {
        return -1; // Any other class is less than 'NEUTRAL'
      } else {
        // Sort by class name first
        const classComparison = a.hsClass.localeCompare(b.hsClass);
        if (classComparison !== 0) {
          return classComparison;
        } else {
          // If classes are the same, sort by mana
          const manaComparison = a.mana - b.mana;
          if (manaComparison !== 0) {
            return manaComparison;
          } else {
            return a.name.localeCompare(b.name);
          }
        }
      }
    });
  }
}

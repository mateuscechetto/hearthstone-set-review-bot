import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { switchMap } from 'rxjs';
import { RatingService } from 'src/app/card-view/data-access/rating/rating.service';
import { UserService } from 'src/app/shared/data-access/user/user.service';
import { User } from 'src/app/shared/models/user';
import { RatedCard } from '../../../shared/models/hs-card';
import { CardService } from '../../data-access/card/card.service';
import { CardGridItemComponent } from '../../ui/card-grid-item/card-grid-item.component';
import { CardViewModalComponent } from '../../ui/card-view-modal/card-view-modal.component';

@Component({
    selector: 'app-card-view',
    templateUrl: './card-view.page.html',
    styleUrls: ['./card-view.page.scss'],
    standalone: true,
    imports: [NgIf, ButtonModule, DataViewModule, SharedModule, CardGridItemComponent, CardViewModalComponent]
})
export class CardViewPage {
  layout: 'list' | 'grid' = 'grid';
  shouldShowModal = false;
  modalCard?: RatedCard;
  cards!: RatedCard[];
  loggedUser: User | undefined;
  pageUser: User | undefined;

  constructor(
    private service: CardService,
    private userService: UserService,
    private route: ActivatedRoute,
    private ratingService: RatingService,
  ) { }

  ngOnInit() {
    const username = this.route.snapshot.params['username'];

    this.userService.getUserByUsername(username).pipe(
      switchMap(pageUser => {
        this.pageUser = pageUser;
        return this.service.getCards(pageUser.name);
      })
    ).subscribe(
      cards => {

        this.cards = cards.map(card => ({
          ...card.card,
          rating: card.rating,
          chatRating: card.chatRating
        }));

      }
    );

    this.userService.getUser().subscribe({
      next: (loggedUser) => {
        this.loggedUser = loggedUser;        
        this.userService.setUserToken(loggedUser.userToken);
      },
      error: (e) => this.loggedUser = undefined
    });

  }

  login() {
    this.userService.login();
  }

  logout() {
    this.userService.logout().subscribe();
  }

  showModal(card: RatedCard) {
    this.modalCard = card;
    this.shouldShowModal = true;
  }

  changeCard(event: number) {
    const index = this.cards.findIndex(c => c.name == this.modalCard?.name);
    this.modalCard = this.cards[index + event] || this.modalCard;
  }

  changedCardRate(event: number) {
    const card = this.cards.find(c => c.name == this.modalCard?.name);
    if (card) {
      const copy = { ...card };
      copy.rating = event;
      this.cards = this.cards.map(c => c.name == copy.name ? copy : c);
    }
  }

  onChangedRate({ rating, card }: { rating: number, card: RatedCard }) {
    if (!this.loggedUser) {
      return
    }
    this.ratingService.rateCard(card.name, rating, this.userService.getUserToken()).subscribe(
      data => {
        this.cards = this.cards.map(c => c.name == card.name ? { ...c, rating: rating } : c)
      }
    )
  }

  onUserIsStreamer(): void {
    if (this.loggedUser) {
      this.userService.userIsStreamer(this.loggedUser.name).subscribe({
        next: (loggedUser) => {
          this.loggedUser = loggedUser;

          if (this.pageUser?.name == this.loggedUser?.name) {
            this.pageUser = loggedUser;
          }

        },
        error: (e) => console.log(e)
      });
    }
  }

  onUserIsNOTStreamer(): void {
    if (this.loggedUser) {
      this.userService.userIsNOTStreamer(this.loggedUser.name).subscribe({
        next: (loggedUser) => {
          this.loggedUser = loggedUser;

          if (this.pageUser?.name == this.loggedUser?.name) {
            this.pageUser = loggedUser;
          }
        },
        error: (e) => console.log(e)
      });
    }
  }

  onRecordChat(card: RatedCard) {
    if (this.loggedUser) {
      this.ratingService.recordChat(card.name, this.userService.getUserToken()).subscribe({
        next: (ratedCard) => {
        },
        error: (e) => console.log(e)
      });
    }
  }

  onStopRecording(card: RatedCard) {
    if (this.loggedUser) {
      this.ratingService.stopRecording(card.name, this.userService.getUserToken()).subscribe({
        next: (ratedCard) => {
          this.cards = this.cards.map(c => c.name == card.name ? { ...c, chatRating: ratedCard.chatRating } : c)
        },
        error: (e) => console.log(e)
      });
    }
  }

}

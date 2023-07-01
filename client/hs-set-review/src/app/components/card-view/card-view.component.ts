import { Component } from '@angular/core';
import { RatedCard } from '../../models/hs-card';
import { CardService } from '../../services/card/card.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent {
  layout: 'list' | 'grid' = 'grid';
  shouldShowModal = false;
  modalCard?: RatedCard;
  cards = this.service.getCards();

  constructor(private service: CardService, private userService: UserService) {}

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
    if ( card ) {
      const copy = {...card};
      copy.rating = event;
      this.cards = this.cards.map(c => c.name == copy.name ? copy : c);    
    }
  }

  test() {
    this.userService.test().subscribe(
      res => {
        console.log(res);
      }
    )
  }

}

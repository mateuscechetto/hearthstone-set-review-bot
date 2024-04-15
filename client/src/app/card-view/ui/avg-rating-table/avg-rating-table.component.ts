import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Card } from '@shared/ui/chart/votes-per-rating-chart/votes-per-rating-chart.component';
import { HearthstoneClass } from '@app/shared/models/hs-card';

type RatingField = 'rating' | 'hsr_rating';

interface RatingByClass {
  hsClass: HearthstoneClass | 'All';
  avgRating: number;
}

@Component({
  selector: 'app-avg-rating-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './avg-rating-table.component.html',
  styleUrls: ['./avg-rating-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvgRatingTableComponent {
  @Input({ required: true }) cards: Card[] = [];
  @Input({ required: true }) field: RatingField = 'rating';

  ratingsByClass: RatingByClass[] = [];

  ngOnChanges() {
    this.ratingsByClass = this.calculateAvgByClass(this.cards, this.field);
  }

  calculateAvgByClass(cards: Card[], field: RatingField): RatingByClass[] {
    const dict: Record<HearthstoneClass | 'All', number[]> = {
      [HearthstoneClass.DEATH_KNIGHT]: [0, 0],
      [HearthstoneClass.DEMON_HUNTER]: [0, 0],
      [HearthstoneClass.DRUID]: [0, 0],
      [HearthstoneClass.HUNTER]: [0, 0],
      [HearthstoneClass.MAGE]: [0, 0],
      [HearthstoneClass.PALADIN]: [0, 0],
      [HearthstoneClass.PRIEST]: [0, 0],
      [HearthstoneClass.ROGUE]: [0, 0],
      [HearthstoneClass.SHAMAN]: [0, 0],
      [HearthstoneClass.WARLOCK]: [0, 0],
      [HearthstoneClass.WARRIOR]: [0, 0],
      [HearthstoneClass.NEUTRAL]: [0, 0],
      All: [0, 0],
    };

    cards.forEach((card) => {
      const { hsClass } = card;
      dict[hsClass][0] += card[field] || 0;
      dict[hsClass][1]++;

      dict['All'][0] += card[field] || 0;
      dict['All'][1]++;
    });

    const avgByClass: RatingByClass[] = Object.values(HearthstoneClass).map(
      (hsClass: HearthstoneClass) => {
        return {
          hsClass: hsClass,
          avgRating: dict[hsClass][0] / dict[hsClass][1],
        };
      }
    );

    avgByClass.push({
      hsClass: 'All',
      avgRating: dict['All'][0] / dict['All'][1],
    });

    return [...avgByClass];
  }
}

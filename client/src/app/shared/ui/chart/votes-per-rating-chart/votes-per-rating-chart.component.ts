import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ChartData, ChartOptions } from 'chart.js';
import { HearthstoneClass } from '@app/shared/models/hs-card';

type RatingField = 'ratings' | 'hsr_rating' | 'rating';

export interface Card {
  hsClass: HearthstoneClass;
  ratings?: number[];
  hsr_rating?: number;
  rating?: number;
}

@Component({
  selector: 'app-votes-per-rating-chart',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './votes-per-rating-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotesPerRatingChartComponent {
  @Input({ required: true }) cards: Card[] = [];
  @Input({ required: true }) field: RatingField = 'ratings';
  @Input() showClasses: boolean = false;

  data!: ChartData;
  options!: ChartOptions;

  ngOnChanges() {
    if (this.showClasses) {
      this.setConfigsGraphWithClasses(this.cards, this.field);
    } else {
      this.setConfigsNormalGraph(this.cards, this.field);
    }
  }

  setConfigsNormalGraph(cards: Card[], field: RatingField) {
    let votes = [0, 0, 0, 0];
    if (field === 'ratings') {
      votes = cards.reduce(
        (acc, card) => {
          if (field in card && card[field])
            card[field]!.forEach((rating) => {
              acc[rating - 1]++;
            });
          return acc;
        },
        [0, 0, 0, 0]
      );
    } else if (field === 'hsr_rating') {
      votes = cards.reduce(
        (acc, card) => {
          if (field in card) acc[(card[field] || 1) - 1]++;
          return acc;
        },
        [0, 0, 0, 0]
      );
    } else {
      votes = cards.reduce(
        (acc, card) => {
          if (field in card) acc[(card[field] || 1) - 1]++;
          return acc;
        },
        [0, 0, 0, 0]
      );
    }

    this.data = {
      labels: ['1', '2', '3', '4'],
      datasets: [
        {
          label: '# of ratings',
          backgroundColor: '#3b82f6',
          data: votes,
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      scales: {
        x: {
          ticks: {
            font: {
              weight: 500,
            },
          },
        },
      },
    };
  }

  setConfigsGraphWithClasses(cards: Card[], field: RatingField) {
    const votesPerClass = this.countRatingsByClass(cards, field);
    const datasets = Object.values(HearthstoneClass).map(
      (hsClass: HearthstoneClass) => {
        return {
          label: hsClass,
          backgroundColor: votesPerClass[hsClass].color,
          data: votesPerClass[hsClass].counts,
        };
      }
    );

    this.data = {
      labels: ['1', '2', '3', '4'],
      datasets: datasets,
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      scales: {
        x: {
          ticks: {
            font: {
              weight: 500,
            },
          },
        },
      },
    };
  }

  private countRatingsByClass(
    cards: Card[],
    field: RatingField
  ): Record<HearthstoneClass, { counts: number[]; color: string }> {
    const result: Record<
      HearthstoneClass,
      { counts: number[]; color: string }
    > = {
      [HearthstoneClass.DEATH_KNIGHT]: {
        counts: [0, 0, 0, 0],
        color: '#42606d71',
      },
      [HearthstoneClass.DEMON_HUNTER]: {
        counts: [0, 0, 0, 0],
        color: '#105e26b9',
      },
      [HearthstoneClass.DRUID]: { counts: [0, 0, 0, 0], color: '#7036067a' },
      [HearthstoneClass.HUNTER]: { counts: [0, 0, 0, 0], color: '#016e0179' },
      [HearthstoneClass.MAGE]: { counts: [0, 0, 0, 0], color: '#006fde6b' },
      [HearthstoneClass.PALADIN]: { counts: [0, 0, 0, 0], color: '#aa8e0079' },
      [HearthstoneClass.PRIEST]: { counts: [0, 0, 0, 0], color: '#111' },
      [HearthstoneClass.ROGUE]: { counts: [0, 0, 0, 0], color: '#4c4d48b0' },
      [HearthstoneClass.SHAMAN]: { counts: [0, 0, 0, 0], color: '#00008071' },
      [HearthstoneClass.WARLOCK]: { counts: [0, 0, 0, 0], color: '#7624ad6e' },
      [HearthstoneClass.WARRIOR]: { counts: [0, 0, 0, 0], color: '#8e10025b' },
      [HearthstoneClass.NEUTRAL]: { counts: [0, 0, 0, 0], color: '#80808063' },
    };

    if (field === 'ratings') {
      return cards.reduce((acc, card) => {
        if (field in card)
          card.ratings!.forEach((rating) => {
            acc[card.hsClass].counts[rating - 1]++;
          });
        return acc;
      }, result);
    } else if (field === 'hsr_rating') {
      return cards.reduce((acc, card) => {
        if (field in card) acc[card.hsClass].counts[(card[field] || 1) - 1]++;
        return acc;
      }, result);
    } else {
      return cards.reduce((acc, card) => {
        if (field in card) acc[card.hsClass].counts[(card[field] || 1) - 1]++;
        return acc;
      }, result);
    }
  }
}

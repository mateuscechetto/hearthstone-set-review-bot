import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-votes-per-rating-chart',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './votes-per-rating-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotesPerRatingChartComponent {
  @Input({ required: true }) votes: number[] = [];

  data!: ChartData;

  options!: ChartOptions;

  ngOnChanges() {
    this.data = {
      labels: ['1', '2', '3', '4',],
      datasets: [
        {
          label: '# of ratings',
          backgroundColor: '#3b82f6',
          data: this.votes,
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
}

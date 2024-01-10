import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-card-grid-skeleton',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './card-grid-skeleton.component.html',
  styleUrls: ['./card-grid-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardGridSkeletonComponent {

}

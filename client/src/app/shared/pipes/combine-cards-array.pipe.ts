import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../ui/chart/votes-per-rating-chart/votes-per-rating-chart.component';
import { CompareCardAPIReturn } from '../models/hs-card';

@Pipe({ name: 'combineCards', standalone: true })
export class CombineCardsPipe implements PipeTransform {
  transform(cards: Card[], reviewers: CompareCardAPIReturn[]): Card[] {
    console.log("batchest")
    return [
      ...cards,
      ...reviewers.reduce(
        (acc, reviewer) => [...acc, ...reviewer.cards],
        [] as Card[]
      ),
    ];
  }
}

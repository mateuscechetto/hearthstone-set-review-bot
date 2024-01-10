import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';

export const CURRENT_EXPANSION = 'Showdown in the Badlands';

export const EXPANSIONS = ['Showdown in the Badlands', 'MINI7'];

@Injectable({
  providedIn: 'root',
})
export class ExpansionService {
  // state
  private state: BehaviorSubject<string> = new BehaviorSubject<string>(
    CURRENT_EXPANSION
  );

  // selectors
  activeExpansion: Observable<string> = this.state;

  // sources
  changeActiveExpansion$ = new Subject<string>();

  constructor() {
    // reducers
    this.changeActiveExpansion$.subscribe({
      next: (expansion) => {
        this.state.next(expansion);
      },
    });
  }
}

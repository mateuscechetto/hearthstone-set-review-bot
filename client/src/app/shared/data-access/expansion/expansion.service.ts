import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export const CURRENT_EXPANSION = 'Whizbang\'s Workshop';

export const EXPANSIONS = ['Whizbang\'s Workshop', 'Delve into Deepholm', 'Showdown in the Badlands'];

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

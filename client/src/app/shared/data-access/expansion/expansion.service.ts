import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, filter } from 'rxjs';

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
  activeExpansion: Observable<string> = this.state.asObservable();

  constructor(private route: ActivatedRoute, private router: Router) {
    // reducers
    this.route.queryParams.pipe(
      filter(params => params['expansion'])
    ).subscribe(params => {
      this.state.next(params['expansion']);
    });
  }

  setActiveExpansion(expansion: string) {
    this.state.next(expansion);
    this.updateQueryParam();
  }

  private updateQueryParam() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { expansion: this.state.value },
      queryParamsHandling: 'merge'
    });
  }
}

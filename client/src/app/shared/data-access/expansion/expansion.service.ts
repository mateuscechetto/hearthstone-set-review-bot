import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs';

export const CURRENT_EXPANSION = 'Into the Emerald Dream';

export const EXPANSIONS = [
  'Into the Emerald Dream',
  'Heroes of StarCraft',
  'The Great Dark Beyond',
  'The Traveling Travel Agency',
  'Perils in Paradise',
  "Dr. Boom's Incredible Inventions",
  "Whizbang's Workshop",
  'Delve into Deepholm',
  'Showdown in the Badlands',
];

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
    this.route.queryParams
      .pipe(
        map((params) => params['expansion']), // Extract 'expansion' query parameter
        distinctUntilChanged(), // Ensure the value changes before triggering the next action
        filter((expansion) => !!expansion) // Filter out falsy values
      )
      .subscribe((expansion) => {
        this.state.next(expansion);
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
      queryParamsHandling: 'merge',
    });
  }
}

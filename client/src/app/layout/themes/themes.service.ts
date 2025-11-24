import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  activeTheme = new BehaviorSubject<Theme>(
    localStorage.getItem('theme') || 'arya-blue' == 'arya-blue'
      ? 'Dark'
      : 'Light'
  );

  setTheme(theme: AvailableThemes) {
    const el = document.getElementById('app-theme') as HTMLLinkElement;
    el.href = `assets/themes/${theme}/theme.css`;
    localStorage.setItem('theme', theme);
    this.activeTheme.next(theme == 'arya-blue' ? 'Dark' : 'Light');
  }

  initTheme() {
    const saved =
      (localStorage.getItem('theme') as AvailableThemes) || 'arya-blue';
    this.setTheme(saved);
  }
}

type AvailableThemes = 'arya-blue' | 'lara-light-blue';

export type Theme = 'Dark' | 'Light';

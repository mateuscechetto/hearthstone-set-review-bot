import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  setTheme(theme: AvailableThemes) {
    const el = document.getElementById('app-theme') as HTMLLinkElement;
    el.href = `assets/themes/${theme}/theme.css`;
    localStorage.setItem('theme', theme);
  }

  initTheme(): Theme {
    const saved =
      (localStorage.getItem('theme') as AvailableThemes) || 'arya-blue';
    this.setTheme(saved);
    return saved == 'arya-blue' ? 'Dark' : 'Light';
  }
}

type AvailableThemes = 'arya-blue' | 'lara-light-blue';

export type Theme = 'Dark' | 'Light';

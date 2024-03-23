import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'possessive', standalone: true })
export class PossessivePipe implements PipeTransform {
  transform(text: string | undefined): string {
    if (!text) return '';
    if (text.toLocaleLowerCase().endsWith('s')) {
      return `${text}' `;
    } else {
      return `${text}'s `;
    }
  }
}
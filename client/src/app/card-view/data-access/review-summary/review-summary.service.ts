import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewSummaryService {
  constructor(private http: HttpClient) {}

  generateImage(username: string, cards: string[]) {
    return this.http.get(
      `${environment.apiUrl}/api/image/generateTwitterImage`,
      {
        responseType: 'blob',
        withCredentials: true,
        params: {
          userName: username,
          cards: JSON.stringify(cards),
        },
      }
    );
  }
}

import { Component } from '@angular/core';


/**
 * Dummy component created to redirect to the user review page.
 * It is needed because backend does not have the user in the moment it redirects,
 * so it redirects to this component, and the redirectGuard redirects to the correct component.
 */
@Component({
  selector: 'app-dummy-redirect',
  templateUrl: './dummy-redirect.component.html',
  styleUrls: ['./dummy-redirect.component.scss']
})
export class DummyRedirectComponent {

}

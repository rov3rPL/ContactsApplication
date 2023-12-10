import { Component } from '@angular/core';
import { AuthorizationService } from './services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ContactsApp';

  constructor(private authorizationService: AuthorizationService) {}

  isUserAuthenticated() {
    return this.authorizationService.isUserAuthenticated();
  }

  public logOut = () => {
    this.authorizationService.logOut();
  }
}

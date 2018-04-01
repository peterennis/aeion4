import { Component } from '@angular/core';

import { LoginPage } from './pages/login/login.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {

  pageLogin = LoginPage;

}

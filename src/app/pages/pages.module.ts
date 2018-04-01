import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicAngularModule } from '@ionic/angular';
import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';

@NgModule({
  imports: [
    CommonModule,
    IonicAngularModule.forRoot(),
  ],
  declarations: [
    HomePage,
    LoginPage
  ],
  entryComponents: [
    LoginPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule { }

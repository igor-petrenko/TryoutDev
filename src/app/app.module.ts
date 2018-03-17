import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from "@angular/common/http";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TryoutsListPage } from "../pages/tryouts-list/tryouts-list";
import { LoginPage } from "../pages/login/login";
import { UserSelectionPage } from "../pages/user-selection/user-selection";
import { RestProvider } from '../providers/rest/rest';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    UserSelectionPage,
    HomePage,
    TryoutsListPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    UserSelectionPage,
    HomePage,
    TryoutsListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})
export class AppModule {}

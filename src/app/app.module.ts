import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from "@angular/common/http";

import { MyApp } from './app.component';
import { TryoutsListPage } from "../pages/tryouts-list/tryouts-list";
import { LoginPage } from "../pages/login/login";
import { UserSelectionPage } from "../pages/user-selection/user-selection";
import { RestProvider } from '../providers/rest/rest';
import { UserProvider } from '../providers/user/user';
import { ChooseModePage } from "../pages/choose-mode/choose-mode";
import { TryoutsProvider } from '../providers/tryouts/tryouts';
import { ComponentsModule } from "../components/components.module";
import { PlayersProvider } from '../providers/players/players';
import { File } from "@ionic-native/file";
import { Transfer } from "@ionic-native/transfer";
import { Camera } from "@ionic-native/camera";
import { FilePath } from "@ionic-native/file-path";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    UserSelectionPage,
    ChooseModePage,
    TryoutsListPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    UserSelectionPage,
    ChooseModePage,
    TryoutsListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    Transfer,
    Camera,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    UserProvider,
    TryoutsProvider,
    PlayersProvider
  ]
})
export class AppModule {}

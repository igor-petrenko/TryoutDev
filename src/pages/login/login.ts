import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {UserSelectionPage} from "../user-selection/user-selection";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public teamName: string;
  public password: string;
  public rememberMe: boolean;

  constructor(public navCtrl: NavController) {
    this.teamName = "";
    this.password = "";
    this.rememberMe = false;

  }

  public signInClick () {
    if (this.validate()) {
      this.signIn()
    }
  }


  // TODO: write validation
  public validate () {
    return true;
  }

  private signIn () {
    this.navCtrl.setRoot(UserSelectionPage).then(function () {

    });
  }

}
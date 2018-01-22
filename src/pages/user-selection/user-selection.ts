import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-user-selection',
  templateUrl: 'user-selection.html'
})
export class UserSelectionPage {

  public users: any[];
  public password: string;
  public rememberMe: boolean;

  constructor(public navCtrl: NavController) {
    this.users = [{id: 1, name: "Igor Petrenko"}, {id: 2, name: "Yuriy Fomenko"}];

  }

  public signInClick () {

  }

}

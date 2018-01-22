import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TryoutsListPage } from "../tryouts-list/tryouts-list";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  public buttonClicked (btnType:string) {
    this.navCtrl.push(TryoutsListPage, {mode: btnType});
  }

}

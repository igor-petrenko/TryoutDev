import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TryoutsListPage } from "../tryouts-list/tryouts-list";
import { UserProvider } from "../../providers/user/user";


@Component({
  selector: 'page-choose-mode',
  templateUrl: 'choose-mode.html',
})
export class ChooseModePage {

  private userName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private user: UserProvider) {
    this.userName = "";
  }

  ionViewDidLoad() {
    this.userName = this.user.getSelected().name;
  }

  public buttonClicked (btnType:string) {
    this.navCtrl.push(TryoutsListPage, {mode: btnType});
  }

}

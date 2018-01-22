import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-tryouts-list',
  templateUrl: 'tryouts-list.html'
})
export class TryoutsListPage {

  // public mode: string;
  public isRegistratorMode: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.mode = this.navParams.get("mode");
    this.isRegistratorMode = this.navParams.get("mode") === 'registrator';


    // TODO: get tryouts from server
  }



}

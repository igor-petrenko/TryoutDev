import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TryoutsProvider } from "../../providers/tryouts/tryouts";

/**
 * Generated class for the TryoutCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tryout-create',
  templateUrl: 'tryout-create.html',
})
export class TryoutCreatePage {

  public tryoutName: string;
  public startDate: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private tryouts: TryoutsProvider) {
    this.tryoutName = '';
    this.startDate = new Date().toISOString();
  }

  ionViewDidLoad() {

  }

  submitForm() {
    if (!this.tryoutName || !this.startDate) {
      return;
    }

    this.tryouts.createNewTryout({name: this.tryoutName, date: this.startDate.substring(0, 10)})
      .subscribe(
        response => {
          this.navCtrl.pop();
        },
        err => {
          // TODO: handle request error
        }
      );
  }

  cancelCreating() {
    this.navCtrl.pop();
  }

}

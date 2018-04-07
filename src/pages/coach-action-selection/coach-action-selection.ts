import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Tryout } from "../../providers/tryouts/tryouts";
import { User, UserProvider } from "../../providers/user/user";
import { CoachTryoutPage } from "../coach-tryout/coach-tryout";

/**
 * Page where coach can select what page he'll open further: Comments or Teams suggestions.
 */

@IonicPage()
@Component({
  selector: 'page-coach-action-selection',
  templateUrl: 'coach-action-selection.html',
})
export class CoachActionSelectionPage {

  tryout: Tryout;
  coach: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private users: UserProvider) {
    this.tryout = {
      id: this.navParams.get("id"),
      name: this.navParams.get("name"),
      date: this.navParams.get("date"),
      status: this.navParams.get("status")
    };

    this.coach = this.users.getSelected();
  }

  buttonClicked (action) {
    this.navCtrl.push('CoachTryoutPage', {mode: action, tryout: this.tryout});
  }

}

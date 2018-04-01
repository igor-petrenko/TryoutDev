import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Tryout } from "../../providers/tryouts/tryouts";
import { Player, PlayersProvider } from "../../providers/players/players";

/**
 * Generated class for the RegistratorTryoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrator-tryout',
  templateUrl: 'registrator-tryout.html',
})
export class RegistratorTryoutPage {

  tryout: Tryout;
  playersList: Player[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public players: PlayersProvider) {
    this.tryout = {
      id: this.navParams.get("id"),
      name: this.navParams.get("name"),
      date: this.navParams.get("date"),
      status: this.navParams.get("status")
    };

    this.playersList = [];
  }

  ionViewDidLoad() {
    this.players.getTryoutPlayers(this.tryout.id).subscribe(
      response => {
        this.playersList = response;
      },
      err => {

      });
  }

}

import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Tryout, TryoutsProvider } from "../../providers/tryouts/tryouts";
import { Player, PlayersProvider } from "../../providers/players/players";
import { PlayerEditPage } from "../player-edit/player-edit";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public players: PlayersProvider,
              public tryouts: TryoutsProvider, private alertCtrl: AlertController)
  {
    this.tryout = {
      id: this.navParams.get("id"),
      name: this.navParams.get("name"),
      date: this.navParams.get("date"),
      status: this.navParams.get("status")
    };

    this.playersList = [];
  }

  ionViewWillEnter() {
    this.players.getTryoutPlayers(this.tryout.id).subscribe(
      response => {
        this.playersList = response;
      },
      err => {

      });
  }

  createPlayer() {
    this.navCtrl.push('PlayerEditPage', {mode: 'create', tryoutId: this.tryout.id});
  }

  openPlayerDetails(player: Player) {
    if (this.tryout.status !== 'opened') {
      return;
    }
    this.navCtrl.push('PlayerEditPage', {player: player, mode: 'edit', tryoutId: this.tryout.id});
  }

  removePlayer(player: Player) {
    this.players.removePlayer(this.tryout.id, player.id).subscribe(
      response => {
        for (var i = 0; i < this.playersList.length; i++) {
          if (this.playersList[i] == player) {
            this.playersList.splice(i, 1);
            break;
          }
        }
      },
      err => {

      }
    );
  }

  closeTryout() {
    this.confirmClosing()
      .then(() => {
        this.tryouts.closeTryout(this.tryout.id).subscribe(
          response => {
            this.navCtrl.pop();
          },
          err => {

          }
        );
      })
      .catch(() => {

      });
  }

  confirmClosing() {
    return new Promise((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title: 'Confirm closing',
        message: 'Do you want to close this tryout?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: reject
          },
          {
            text: 'Yes',
            handler: resolve
          }
        ]
      });
      alert.present();
    });
  }

}

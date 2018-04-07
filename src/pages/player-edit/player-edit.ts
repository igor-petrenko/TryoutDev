import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Player, PlayersProvider } from "../../providers/players/players";

/**
 * Generated class for the PlayerEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player-edit',
  templateUrl: 'player-edit.html',
})
export class PlayerEditPage {

  player: Player;
  initPlayerImage: string;
  mode: string;
  tryoutId: number;

  positions = ['Outside hitter', 'Right side hitter', 'Opposite Hitter',
              'Setter', 'Middle Blocker', 'Libero', 'Defensive Specialist'];

  constructor(public navCtrl: NavController, public navParams: NavParams, private players: PlayersProvider,
              private loadingCtrl: LoadingController)
  {
    this.tryoutId = this.navParams.get("tryoutId") || null;
    this.player = this.navParams.get("player") || {};
    this.mode = this.navParams.get("mode") || 'create';
    this.initPlayerImage = this.player.image;
  }

  captureImage() {

  }

  cancelEditing() {
    this.navCtrl.pop();
  }

  removePlayer() {
    if (this.tryoutId === null) {
      //TODO: handle incorrect tryout id
      return;
    }
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Deleting...'
    });
    loading.present();
    this.players.removePlayer(this.tryoutId, this.player.id).subscribe(
      response => {
        this.navCtrl.pop();
        loading.dismiss();
      },
      err => {
        //TODO: handle player deleting error
      }
    );
  }

  submitForm() {

  }

}

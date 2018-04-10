import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Player, PlayersProvider } from "../../providers/players/players";
import { User, UserProvider } from "../../providers/user/user";

/**
 * Generated class for the SuggestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-suggest',
  templateUrl: 'suggest.html',
})
export class SuggestPage {

  positions = ['Outside hitter', 'Right side hitter', 'Opposite Hitter',
    'Setter', 'Middle Blocker', 'Libero', 'Defensive Specialist'];

  player: Player;
  tryoutId: number;
  user: User;

  suggestion: any;
  suggestionExists: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private users: UserProvider,
              private players: PlayersProvider) {
    this.player = this.navParams.get("player") || {};
    this.suggestion = this.navParams.get("suggestion") || {};
    this.suggestionExists = true;
    if (!this.suggestion.suggest) {
      this.suggestion = {
        id: null,
        suggest: this.player.position
      };
      this.suggestionExists = false;
    }
    this.tryoutId = this.navParams.get("tryoutId") || null;
    this.user = this.users.getSelected();
  }

  saveSuggestion() {
    this.players.saveSuggestion(this.user.id, this.tryoutId, this.player.id,
          this.suggestion.id, this.suggestion.suggest).subscribe(
      response => {
        this.removePlayerDetailsView();
        this.navCtrl.pop();
      },
      err => {

      }
    );
  }

  rmSuggestion() {
    this.players.removeSuggestion(this.user.id, this.tryoutId, this.player.id).subscribe(
      response => {
        this.removePlayerDetailsView();
        this.navCtrl.pop();
      },
      err => {

      }
    );
  }

  private removePlayerDetailsView() {
    let viewsNumber = this.navCtrl.length();
    this.navCtrl.remove(viewsNumber - 2);
  }

  cancelBtn() {
    this.navCtrl.pop();
  }

}

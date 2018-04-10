import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Comment, Player, PlayersProvider } from "../../providers/players/players";
import { User, UserProvider } from "../../providers/user/user";
import { SuggestPage } from "../suggest/suggest";

/**
 * Generated class for the PlayerDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player-details',
  templateUrl: 'player-details.html',
})
export class PlayerDetailsPage {

  player: Player;
  initPlayerImage: string;
  mode: string;
  tryoutId: number;
  user: User;

  positions = ['Outside hitter', 'Right side hitter', 'Opposite Hitter',
    'Setter', 'Middle Blocker', 'Libero', 'Defensive Specialist'];

  comments: any[];

  suggestion: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private players: PlayersProvider,
              private users: UserProvider, private loadingCtrl: LoadingController)
  {
    this.player = this.navParams.get("player") || {};
    this.mode = this.navParams.get("mode") || 'comments';
    this.initPlayerImage = this.player.image;
    this.tryoutId = this.navParams.get("tryoutId") || null;
    this.user = this.users.getSelected();
    this.comments = [];
    this.suggestion = null;
  }

  ionViewWillEnter() {
    if (this.mode === 'comments' || this.mode === 'suggestions') {
      this.receivePlayerComments();
      this.receivePlayerSuggestion();
    }
  }

  /*********** CREATE and EDIT mode************/

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
    if (this.mode === 'create') {
      this.players.addPlayer(this.tryoutId, this.player).subscribe(
        response => {
          this.navCtrl.pop();
        }
      );
    }
    else if (this.mode === 'edit') {
      this.players.editPlayer(this.tryoutId, this.player).subscribe(
        response => {
          this.navCtrl.pop();
        }
      );
    }
  }

  /*********** COMMENTS and SUGGESTIONS mode************/

  receivePlayerComments() {
    this.players.getPlayerComments(this.tryoutId, this.user.id, this.player.id).subscribe(
      comments => {
        this.comments = comments;
      },
      err => {

      }
    );
  }

  openComment(comment: Comment) {
    this.navCtrl.push('CommentPage',
      {player: this.player, tryoutId: this.tryoutId, comment: comment});
  }

  receivePlayerSuggestion() {
    this.players.getPlayerSuggestion(this.user.id, this.tryoutId, this.player.id).subscribe(
      response => {
        this.suggestion = response;
      },
      err => {

      }
    );
  }

  suggestPlayer() {
    this.navCtrl.push('SuggestPage',
      {player: this.player, tryoutId: this.tryoutId, suggestion: this.suggestion})
  }
}

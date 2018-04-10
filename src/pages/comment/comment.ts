import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Comment, Player, PlayersProvider } from "../../providers/players/players";
import { User, UserProvider } from "../../providers/user/user";

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  player: Player;
  tryoutId: number;
  user: User;
  comment: Comment;

  constructor(public navCtrl: NavController, public navParams: NavParams, private users: UserProvider,
              private players: PlayersProvider) {
    this.player = this.navParams.get("player") || {};
    this.tryoutId = this.navParams.get("tryoutId") || null;
    this.user = this.users.getSelected();
    this.comment = this.navParams.get("comment") || {id: null, comment: '', date: ''};
  }

  ionViewDidLoad() {

  }

  saveComment() {
    this.players.saveComment(this.comment.id || null, this.comment.comment,
          this.player.id, this.user.id, this.tryoutId)
      .subscribe(
        response => {
          this.navCtrl.pop();
        },
        err => {

        }
      );
  }

  rmComment() {
    this.players.removeComment(this.comment.id || null,
          this.player.id, this.user.id, this.tryoutId)
      .subscribe(
        response => {
          this.navCtrl.pop();
        },
        err => {

        }
      );
  }

  cancelBtn() {
    this.navCtrl.pop();
  }

}

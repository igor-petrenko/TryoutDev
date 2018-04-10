import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Tryout } from "../../providers/tryouts/tryouts";
import { User, UserProvider } from "../../providers/user/user";
import { Player, PlayersProvider } from "../../providers/players/players";
import { PlayerDetailsPage } from "../player-details/player-details";

/**
 * Page with a list of players of selected tryout.
 * Current page can be opened in two modes: comments and suggestions.
 */

@IonicPage()
@Component({
  selector: 'page-coach-tryout',
  templateUrl: 'coach-tryout.html',
})
export class CoachTryoutPage {

  tryout: Tryout;
  coach: User;
  playersList: Player[];
  pageMode: string;

  allFiltersData: any;
  applyedFiltersData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private users: UserProvider,
              public players: PlayersProvider, private loadingCtrl: LoadingController)
  {
    this.pageMode = this.navParams.get("mode");
    this.tryout = this.navParams.get("tryout");
    this.coach = this.users.getSelected();
    this.playersList = [];

    this.allFiltersData = {age: [], position: []};
    this.applyedFiltersData = {age: 0, position: '', withComments: false};
  }

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      dismissOnPageChange: true,
      enableBackdropDismiss: true,
      content: 'Loading...'
    });
    loading.present();


    this.players.getTryoutPlayers(this.tryout.id).subscribe(
      playersListResponse => {
        if (this.pageMode === 'comments') {
          this.playersList = playersListResponse;
          this.parseAllFiltersData();
          this.checkFiltersCorrect();
          loading.dismissAll();
        }
        else if (this.pageMode === 'suggestions') {
          this.players.getTeamSuggestions(this.coach.id, this.tryout.id).subscribe(
            suggestions => {
              let suggestedPlayerIds = suggestions.map(suggestion => suggestion.playerId);
              let parsedPlayers = playersListResponse.filter(player => suggestedPlayerIds.indexOf(player.id) !== -1);

              this.playersList = parsedPlayers.map(player => {
                if (suggestedPlayerIds.indexOf(player.id) !== -1) {
                  player.suggestedPosition = suggestions.find(item => item.playerId === player.id).suggest;
                  return player;
                }
                return null;
              });
              loading.dismissAll();
            }
          );
        }
      },
      err => {

      });
  }

  parseAllFiltersData() {
    this.allFiltersData.age = [];
    this.allFiltersData.position = [];

    this.playersList.forEach(player => {
      if (this.allFiltersData.age.indexOf(player.age) === -1) {
        this.allFiltersData.age.push(player.age);
      }
      if (this.allFiltersData.position.indexOf(player.position) === -1) {
        this.allFiltersData.position.push(player.position);
      }
    });

    this.allFiltersData.age.sort();
    this.allFiltersData.position.sort();

    this.allFiltersData.age.unshift('all');
    this.allFiltersData.position.unshift('all');
  }

  checkFiltersCorrect() {
    if (!this.applyedFiltersData.age ||
      (this.allFiltersData.age.indexOf(this.applyedFiltersData.age) === -1 && this.applyedFiltersData.age !== 'all'))
    {
      this.applyedFiltersData.age = 'all';
    }

    if (!this.applyedFiltersData.position ||
      (this.allFiltersData.position.indexOf(this.applyedFiltersData.position) === -1
        && this.applyedFiltersData.position !== 'all'))
    {
      this.applyedFiltersData.position = 'all';
    }
  }



  openPlayerDetails(player: Player) {
    this.navCtrl.push('PlayerDetailsPage', {
      player: player,
      mode: this.pageMode,
      tryoutId: this.tryout.id
    });
  }

  newTeamSuggestion() {
    this.navCtrl.push('CoachTryoutPage', {mode: 'comments', tryout: this.tryout});
  }

}

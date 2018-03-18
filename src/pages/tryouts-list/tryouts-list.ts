import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Tryout, TryoutsProvider } from "../../providers/tryouts/tryouts";
import { User, UserProvider } from "../../providers/user/user";

@Component({
  selector: 'page-tryouts-list',
  templateUrl: 'tryouts-list.html'
})
export class TryoutsListPage {

  private mode: string;
  private isCoachMode: boolean;
  private tryoutsList: Tryout[];
  private user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private tryouts: TryoutsProvider, private users: UserProvider) {
    this.mode = this.navParams.get("mode");
    this.isCoachMode = this.navParams.get("mode") === 'coach';
    this.user = new User();
  }

  ionViewDidLoad () {
    this.user = this.users.getSelected();


    this.tryouts.loadAllTryouts().subscribe(tryouts => {
      this.tryoutsList = tryouts;
    }, err => {
      //TODO: handle response error
    });
  }


  public createTryoutClick () {

  }
}

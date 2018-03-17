import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from "../../providers/rest/rest";
import { LoginPage } from "../login/login";


@Component({
  selector: 'page-user-selection',
  templateUrl: 'user-selection.html'
})
export class UserSelectionPage {

  public users: any;
  public password: string;
  public rememberMe: boolean;

  constructor(public navCtrl: NavController, public api: RestProvider) {
    // this.users = [{id: 1, name: "Igor Petrenko"}, {id: 2, name: "Yuriy Fomenko"}];
    this.users = [];
  }

  ionViewWillEnter () {
    this.getUsers();
  }

  getUsers() {
    this.api.getUsers()
      .then(data => {
        this.users = data;
        console.log(this.users);
      })
  }

  public signInClick () {
    console.log("sign in");
  }

  public registerUser () {
    this.navCtrl.push("RegisterUserPage");
  }

  private signOut () {
    this.navCtrl.setRoot(LoginPage).then(data => {
      // TODO: clear saved user
    });
  }

}

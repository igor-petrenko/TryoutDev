import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { UserProvider } from "../../providers/user/user";


@Component({
  selector: 'page-user-selection',
  templateUrl: 'user-selection.html'
})
export class UserSelectionPage {

  public users: any;
  public selectedUserId: number;

  constructor(public navCtrl: NavController, public user: UserProvider) {
    this.users = [];
    this.selectedUserId = null;
  }

  ionViewWillEnter () {
    this.user.getAllUsers()
      .then(data => {
        this.users = data;
        console.log(this.users);
      });
  }

  public selectUser () {
    if (this.selectedUserId) {
      this.user.setSelected(this.getUserDataById(Number(this.selectedUserId)));

    }
  }

  private getUserDataById (userId) {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].id === userId) {
        return this.users[i];
      }
    }
  }

  public registerUser () {
    this.navCtrl.push("RegisterUserPage");
  }

  private signOut () {
    this.navCtrl.setRoot(LoginPage).then(data => {
      this.user.clearUser();
    });
  }

}

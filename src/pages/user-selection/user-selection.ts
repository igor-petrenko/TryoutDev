import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { User, UserProvider } from "../../providers/user/user";
import { ChooseModePage } from "../choose-mode/choose-mode";


@Component({
  selector: 'page-user-selection',
  templateUrl: 'user-selection.html'
})
export class UserSelectionPage {

  public users: User[];
  public selectedUserId: number;

  constructor(public navCtrl: NavController, public user: UserProvider) {
    this.users = [];
    this.selectedUserId = null;

    //TODO: current code used for automatically forwarding to a ChooseModePage on app start.
    // This method is not good because user will see a page transition animation.
    // Maybe will be better to forward to a ChooseModePage in app.component.ts

    // let userData = JSON.parse(localStorage.getItem('selectedUser'));
    // if (userData) {
    //   this.selectedUserId = userData.id;
    //   this.user.setSelected(userData);
    //   this.navCtrl.push(ChooseModePage);
    // }
  }

  ionViewDidEnter() {
    let selected = this.user.getSelected();
    this.selectedUserId = selected ? selected.id : null;
  }

  ionViewWillEnter () {
    this.user.getAllUsers().subscribe(usersList => {
      this.users = usersList;
      console.log("All users: ", this.users);
    }, err => {
      //TODO: handle error received from server
    });
  }

  public selectUser () {
    if (this.selectedUserId) {
      let userData = this.getUserDataById(Number(this.selectedUserId));
      localStorage.setItem('selectedUser', JSON.stringify(userData));
      this.user.setSelected(userData);
      this.navCtrl.push(ChooseModePage);
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
      this.user.clearSelectedUser();
      localStorage.setItem('teamName', '');
      localStorage.setItem('selectedUser', '');
    });
  }

}

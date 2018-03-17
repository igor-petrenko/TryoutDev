import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from "../../providers/rest/rest";
import { UserSelectionPage } from "../user-selection/user-selection";

@IonicPage()
@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {

  public firstName: string;
  public lastName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: RestProvider) {
    this.firstName = "";
    this.lastName = "";
  }

  public submitForm () {
    if (!this.firstName || !this.lastName) {
      // TODO: show empty fields message
      return;
    }
    this.api.addUser({"firstName": this.firstName, "lastName": this.lastName})
      .then(response => {
        console.log('response: ', response);
        this.navCtrl.pop();
        // TODO: find a way to update users list in UserSelectionPage
        // TODO: go to "Choose mode" page
        this.clearForm();
      })
      .catch(error => {
        // TODO: handle and show error
      });
  }

  public cancelRegister () {
    this.clearForm();
    this.navCtrl.pop();
  }

  private clearForm () {
    this.firstName = "";
    this.lastName = "";
  }

}

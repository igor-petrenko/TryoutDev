import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestProvider } from "../rest/rest";


export class User {
  id: number;
  name: string;
}

@Injectable()
export class UserProvider {

  private selectedUser: User;

  constructor(public http: HttpClient, private api: RestProvider) {
    this.selectedUser = JSON.parse(localStorage.getItem('lastSelectedUser')) || null;
  }

  public getAllUsers() {
    return this.api.getUsers();
  }

  public getSelected (): User {
    return this.selectedUser;
  }

  public setSelected (data) {
    if (!data) return;
    this.selectedUser = data;
    localStorage.setItem('lastSelectedUser', JSON.stringify(this.selectedUser));
  }

  public clearSelectedUser () {
    this.selectedUser = null;
  }

  public registerNewUser (data) {
    return this.api.addUser(data);
  }

}

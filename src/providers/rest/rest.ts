import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from "../user/user";
import { Observable } from "rxjs/Observable";
import { Tryout } from "../tryouts/tryouts";

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl: string = 'https://jsonplaceholder.typicode.com';

  constructor(public http: HttpClient) {

  }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/users');
  }

  addUser(data: User) {
    // this.http.post(this.apiUrl + '/users', JSON.stringify(data), {
    //   headers: new HttpHeaders().set('Authorization', 'my-auth-token'),
    //   params: new HttpParams().set('id', '3')
    // })
    return this.http.post(this.apiUrl + '/users', JSON.stringify(data))
  }


  getTryouts(): Observable<Tryout[]> {
    return this.http.get<Tryout[]>(this.apiUrl + '/tryouts');
  }

  createNewTryout(data: Tryout) {
    return this.http.post(this.apiUrl + '/tryouts', JSON.stringify(data))
  }

  closeTryout(tryoutId: number) {
    return this.http.get(this.apiUrl + '/tryouts/remove/' + tryoutId);
  }




}

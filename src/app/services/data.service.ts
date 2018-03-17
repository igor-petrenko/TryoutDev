export class DataService {
  private data:Array<{login:string, password:string}> = [];

  getData(): any {
    return this.data;
  }

  addData(login:string, password:string) {
    this.data.push({login: login, password: password});
  }
}

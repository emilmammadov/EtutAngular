import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  USER = '@user';

  constructor() { }

  setLocalUser(user, role) {
    sessionStorage.setItem(this.USER, JSON.stringify({role, ...user}))
  }

  getLocalUser() {
    return JSON.parse(sessionStorage.getItem(this.USER));
  }

  removeLocalUser() {
    sessionStorage.removeItem(this.USER);
  }
}

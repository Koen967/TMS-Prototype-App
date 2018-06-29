import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url = 'http://localhost:62665/api/';
  private roles = ['admin', 'user', 'guest'];
  private rights = ['Sample', 'TruckData', 'Authorisation'];
  private roleRights = {
    admin: { rights: ['Sample', 'TruckData', 'Authorisation'] },
    user: { rights: ['Sample', 'TruckData'] },
    guest: { rights: ['Sample'] }
  };

  constructor(private http: HttpClient) {}

  login(user): Observable<string> {
    console.log('SERVICE', user);
    return this.http.post<string>(`${this.url}users/Login`, {
      userName: user.username,
      password: user.password
    });
  }

  logout(token: string) {
    return true;
  }

  getUserRoles(userName: string) {
    return this.roles;
  }

  rightExistsInDb(page: string) {
    return this.rights.includes(page) ? true : false;
  }

  addRightToDb(page: string) {
    this.rights.push(page);
  }

  getUserRights(user: string) {
    return this.roleRights[user];
  }
}

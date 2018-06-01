import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url = 'http://localhost:62665/api/';

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
}

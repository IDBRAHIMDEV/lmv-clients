import { AuthData } from './../models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private http: HttpClient) { }

  createAccount(user: AuthData) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  login(user) {
    //return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDcoqna2C4RqWUfLbMbn0p4pUHXidzfJAQ', {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    });


  }

  userAuthenticated() {
    return this.afAuth.user;
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

}

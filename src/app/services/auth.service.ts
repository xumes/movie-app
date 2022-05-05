import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then(value => {
      this.router.navigateByUrl('/movies')
    })
    .catch(err => {
      console.log("Something went wrong: ", err.message)
    })
  }

  emailSignup(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(value => {
      this.router.navigateByUrl('/movies')
    })
    .catch(err => {
      console.log("Something went wrong: ", err)
    })
  }

  isUserLogged() {
    const user:any = this.afAuth.currentUser
    if(user) {
      return true
    }

    return false
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigateByUrl('/login')
    })
  }
}

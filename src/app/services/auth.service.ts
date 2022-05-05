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
      console.log("Nice, it works", value)
      this.router.navigateByUrl('/')
    })
    .catch(err => {
      console.log("Something went wrong: ", err.message)
    })
  }

  emailSignup(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(value => {
      console.log("Success", value)
      this.router.navigateByUrl('/')
    })
    .catch(err => {
      console.log("Something went wrong: ", err)
    })
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigateByUrl('/login')
    })
  }
}

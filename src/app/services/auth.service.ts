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
      //check if user has account on database and grab name to update the localStorage
      localStorage.setItem('user', JSON.stringify(value.user))
      this.router.navigateByUrl('/movies')
    })
    .catch(err => {
      console.log("Something went wrong: ", err.message)
    })
  }

  emailSignup(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(value => {
      localStorage.setItem('user', JSON.stringify(value.user))
      this.router.navigateByUrl('/profile')
    })
    .catch(err => {
      console.log("Something went wrong: ", err)
    })
  }

  isUserLogged() {
    const user:any = localStorage.getItem('user')
    if(user) {
      return true
    }

    return false
  }

  getCurrentUser() {
    const user:any = localStorage.getItem('user')
    return JSON.parse(user)
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigateByUrl('/login')
    })
  }
}

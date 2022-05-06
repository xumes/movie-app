import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserService } from './user.service'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  docId: string = ""

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router
  ) { }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then(value => {
      //check if user has account on database and grab name to update the localStorage
      const userId = value.user?.uid || ''

      const currentUser = this.userService.getCurrentUser(userId)
      currentUser.get().subscribe(user => {
        if (user.docs.length >= 1) {
          //if there is one user on the database with this uid
          user.forEach(doc => this.docId = doc.id)
          const currentUser = user.docs[0]
          const loggedInUser = {
            name: currentUser.get('name'),
            email: currentUser.get('email'),
            id: this.docId,
            uuid: currentUser.get('uid')
          }
          localStorage.setItem('user', JSON.stringify(loggedInUser))
          this.router.navigateByUrl('/movies')
        }
      })

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

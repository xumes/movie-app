import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: any

  constructor(
    private firestore: AngularFirestore
  ) { }

  createUser(user: User) {
    return this.firestore.collection('users').add(user)
    localStorage.removeItem('user')
    localStorage.setItem('user', JSON.stringify(user))
  }

  updateUser(user: User) {
    const docId = user.id
    delete user.id
    this.firestore.doc('users/' + docId).update(user)
    localStorage.removeItem('user')
    localStorage.setItem('user', JSON.stringify(user))
  }

  getCurrentUser(id: string)  {
      return this.firestore.collection("users", ref => ref.where("uid", "==", id))
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable,tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: any

  constructor(private firestore: AngularFirestore) { }

  // getUsers() {
  //   return this.firestore.collection('users').snapshotChanges();
  // }

  // createUser(user: User) {
  //   return this.firestore.collection('users').add(user)
  // }

  // updateUser(user: User) {
  //   delete user.uid;
  //   this.firestore.doc('users/' + user.uid).update(user)
  // }

  getCurrentUser(id: string): Observable<any>  {
    const user =  this.firestore
      .collection('users')
      .doc(id)
      .get()

    return user
  }
}

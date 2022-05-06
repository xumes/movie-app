import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  uuid: string = ""
  name: string = ""
  email: string = ""
  docId: string = ""

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser()
    this.name = currentUser.name
    this.email = currentUser.email
    this.uuid = currentUser.uid
    this.getUserData(currentUser.uid)
  }

  getUserData(id: string): void {
    const currentUser =  this.userService.getCurrentUser(id)

    currentUser.get().subscribe(user => {
      if (user.docs.length >= 1) {
        //if there is one user on the database with this uid
        user.forEach(doc => this.docId = doc.id)
        const currentUser = user.docs[0]
        this.email = currentUser.get('email')
        this.name = currentUser.get('name')
      }
    })
  }

  onSubmit(formData: any) {
    if (formData.valid) {
      //check if the user exists onthe database
      const currentUser =  this.userService.getCurrentUser(this.uuid)
      currentUser.get().subscribe(user => {
        if (user.docs.length >= 1) {
        //update user
        console.log("original id", this.docId)
        this.userService.updateUser({
          id: this.docId,
          uid: this.uuid,
          name: formData.value.name,
          email: formData.value.email,
          lastLoginAt:  new Date()
        })
      } else {
        // Create user
        this.userService.createUser({
          uid: this.uuid,
          name: formData.value.name,
          email: formData.value.email,
          createdAt:  new Date(),
          lastLoginAt:  new Date()
        })
      }
    })
  }
   }

}

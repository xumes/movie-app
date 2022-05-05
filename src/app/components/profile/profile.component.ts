import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
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
  currentUser: User = {
    name: "",
    email: ""
  }

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser()
    this.name = currentUser.name
    this.email = currentUser.email
    this.getUserData(currentUser.uid)
  }

  async getUserData(id: string): Promise<void> {
    const currentUser =  await this.userService.getCurrentUser(id)
    currentUser.subscribe(user => {
      if (user.data()) {
        this.currentUser = user.data()
        this.email = user.get('email')
        this.name = user.get('name')
        console.log("meu email", this.email)
      }
    })
  }

  onSubmit(formData: any) {

  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name: string = ""
  email: string = ""
  password: string = ""

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getUserData()
  }

  async getUserData() {
    const currentUser =  this.userService.getCurrentUser('LASZyUb2YDW0P5dln9xG')
    .then(theUser => {
      console.log("este sim, éo  ususario", theUser)
    })
    console.log("est é o usuario", currentUser)
  }

  onSubmit(formData: any) {
    if (formData.valid) {
      console.log(formData.value)
     this.userService.getCurrentUser('123')
    }
  }

}

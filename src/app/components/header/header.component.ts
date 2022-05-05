import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', '../../app.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any = null
  displayName: string = ""

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser()

    console.log("user from service", this.user)

    if (this.user.name) {
      this.displayName = this.user.name
    } else {
      this.displayName = this.user.email
    }

    console.log("user", this.user)
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', '../../app.component.scss']
})
export class HeaderComponent implements OnInit {
  hasLoggedUser: boolean = false
  displayName: string = ""

  constructor(
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.hasLoggedUser = this.authService.isUserLogged()
    const user = this.authService.getCurrentUser()
    this.displayName = user.name || ""
  }

}

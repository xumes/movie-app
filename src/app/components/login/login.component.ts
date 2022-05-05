import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = ''
  password: string = ''

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if (this.authService.isUserLogged()) {
      this.router.navigateByUrl('/movies')
    }
  }

  onSubmit(formData: any) {
    if (formData.valid) {
      console.log(formData.value)
      this.authService.login(
        formData.value.email,
        formData.value.password
      )
    }
  }

}

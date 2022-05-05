import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = ''
  password: string = ''

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
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

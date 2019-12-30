import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { AuthData } from './../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: AuthData = {
    email: '',
    password: ''
  }

  constructor(
        private authService: AuthService, 
        private router: Router, 
        private toastService: ToastrService
        ) { }

  ngOnInit() {
  }

  signIn() {
    this.authService.login(this.user).subscribe((res: any) => {
      localStorage.setItem('lmv_token', res.idToken)
      alert(localStorage.getItem('lmv_token'))
      localStorage.removeItem('lmv_token');
    })
  }

}

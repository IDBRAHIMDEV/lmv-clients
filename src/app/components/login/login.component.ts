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
    this.authService.login(this.user)
        .then(() => {
          this.toastService.info("You'are Logged SuccessFully", "Created", {
            timeOut: 5000,
            positionClass: 'toast-bottom-left',
            tapToDismiss: true
          })
          this.router.navigate(['/clients'])
        })
        .catch((err) => {
          this.toastService.error(err.message, "Error", {
            timeOut: 5000,
            positionClass: 'toast-bottom-left',
            tapToDismiss: true
          })
          
        })
  }

}

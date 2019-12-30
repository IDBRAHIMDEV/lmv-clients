import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthData } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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

  register() {
    this.authService.createAccount(this.user)
        .then(() => {
          this.toastService.success("Account created SuccessFully", "Created", {
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

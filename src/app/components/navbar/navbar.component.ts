import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser = null;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastrService
    ) { }

  ngOnInit() {
    this.authService.userAuthenticated()
        .subscribe(user => this.currentUser = user)
  }

  signOut() {
    this.authService.logout()
    .then(() => {
      this.toastService.success("signOut SuccessFully", "Lougout", {
        timeOut: 5000,
        positionClass: 'toast-bottom-left',
        tapToDismiss: true
      })
      this.router.navigate(['/login'])
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

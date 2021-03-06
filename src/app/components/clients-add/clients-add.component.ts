import { AuthService } from 'src/app/services/auth.service';
import { Client } from './../../models/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-clients-add',
  templateUrl: './clients-add.component.html',
  styleUrls: ['./clients-add.component.css']
})
export class ClientsAddComponent implements OnInit {

  clientForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    balance: new FormControl(0, Validators.required)
  });

  currentUser = null;

  constructor(
      private clientService: ClientService, 
      private router: Router,
      private toastService: ToastrService,
      private authService: AuthService
      ) { 
        this.authService.userAuthenticated()
        .subscribe(user => this.currentUser = user)
      }

  ngOnInit() {
  }

  persistClient() {

    if(this.clientForm.invalid){
      this.toastService.warning("Please check the data in the Form", "Form Invalid", {
        timeOut: 5000,
        positionClass: 'toast-bottom-left',
        tapToDismiss: true
      })
      return;
    }

    let data: Client = {
      ...this.clientForm.value,
      created_at: new Date(),
      user_id: this.currentUser.uid
    }

    this.clientService.postClient(data)
        .then(() => {
          this.toastService.success("Client added SuccessFully", "Created", {
            timeOut: 5000,
            positionClass: 'toast-bottom-left',
            tapToDismiss: true
          })
          this.router.navigate(['/clients'])
        })
        .catch(err => {
          this.toastService.error(err.message, "Error", {
            timeOut: 5000,
            positionClass: 'toast-bottom-left',
            tapToDismiss: true
          })
        })
  }

}

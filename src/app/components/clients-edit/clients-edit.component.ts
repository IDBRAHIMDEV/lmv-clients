import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Client } from './../../models/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clients-edit',
  templateUrl: './clients-edit.component.html',
  styleUrls: ['./clients-edit.component.css']
})
export class ClientsEditComponent implements OnInit, OnDestroy {

  clientForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    balance: new FormControl(0, Validators.required)
  });

  clientSubscription: Subscription;

  idClient: string = "";
  constructor(private router: Router, private route: ActivatedRoute, private clientService: ClientService) { }

  ngOnInit() {
     this.route.params.subscribe(params => {

      this.idClient = params.id;

       this.clientSubscription = this.clientService.getOneClient(params.id)
            .subscribe((res: Client) => {
                this.clientForm.patchValue(res);
            })
     });
  }

  updateClient() {

    let data: Client = {
      ...this.clientForm.value,
      updated_at: Date()
    }


    this.clientService.updateClient(this.idClient, data)
        .then(() => {
            this.router.navigate(['/clients']);
        })
  }


  ngOnDestroy() {
     this.clientSubscription.unsubscribe();
  }

}

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Client } from './../../models/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clients-edit',
  templateUrl: './clients-edit.component.html',
  styleUrls: ['./clients-edit.component.css']
})
export class ClientsEditComponent implements OnInit {

  clientForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    balance: new FormControl(0, Validators.required)
  });

  constructor(private route: ActivatedRoute, private clientService: ClientService) { }

  ngOnInit() {
     this.route.params.subscribe(params => {
        this.clientService.getOneClient(params.id)
            .subscribe((res: Client) => {
                this.clientForm.patchValue(res);
            })
     });
  }

}

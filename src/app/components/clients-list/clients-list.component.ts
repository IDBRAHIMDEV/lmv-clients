import { ToastrService } from 'ngx-toastr';
import { Client } from './../../models/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  clients: Client[] = [];
  resClients: Client[] = [];
  search: string = "";

  constructor(private clientService: ClientService, private toastService: ToastrService) { }

  ngOnInit() {
    this.clientService.getClients() 
        .subscribe((res: Client[]) => {
          this.resClients = this.clients = res;
        })
  }

  destroyClient(id: string) {
    this.clientService.deleteClient(id)
        .then(() => {
          this.toastService.info("Client Deleted", "Info", {
            timeOut: 5000,
            positionClass: 'toast-bottom-left',
            tapToDismiss: true
          })
        })
        .catch((err) => this.toastService.error(err.message, "error", {
          timeOut: 5000,
          positionClass: 'toast-bottom-left',
          tapToDismiss: true
        }));
  }

  searchClients() {

    if(this.search.length >= 3) {

      this.resClients = this.clients.filter((client: Client) => (client.firstName.includes(this.search) ||
          client.lastName.includes(this.search) ||
          client.email.includes(this.search) ||
          client.phone.includes(this.search))
      );
    }else {
      this.resClients = this.clients;
    }
  }

}

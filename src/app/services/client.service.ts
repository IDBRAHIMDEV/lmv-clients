import { Client } from './../models/client';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private afs: AngularFirestore) {
      
   }

   getClients(userId) {
     return this.afs.collection('clients', ref => ref.where('user_id', '==', userId))
                .snapshotChanges().pipe(
                  map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Client;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                  }))
                );
   }

   postClient(client: Client) {
     return this.afs.collection('clients').add(client);
   }

   deleteClient(id: string) {
     return this.afs.collection('clients').doc(id).delete();
   }

   getOneClient(id: string) {
     return this.afs.collection('clients').doc(id).valueChanges();
   }

   updateClient(id, data: Client) {
     return this.afs.collection('clients').doc(id).update(data);
   }
}

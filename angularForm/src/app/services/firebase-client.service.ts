import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class FirebaseClientService {
  constructor(private firebaseClient: AngularFirestore) {}
  createUser(user: User): any {
    return this.firebaseClient
      .collection(environment.firebaseCollections.user)
      .add(user)
      .then((response) => {
        return response;
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseClientService } from './../../services/firebase-client.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [FirebaseClientService],
})
export class HomePageComponent implements OnInit {
  constructor(private firebase: FirebaseClientService) {}

  ngOnInit(): void {}
  createUser(form: NgForm) {
    this.firebase.createUser(form.value as User);
  }
}

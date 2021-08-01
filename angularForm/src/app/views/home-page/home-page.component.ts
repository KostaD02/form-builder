import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { FirebaseClientService } from './../../services/firebase-client.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [FirebaseClientService],
})
export class HomePageComponent implements OnInit {
  schemaObject!: string;
  constructor(
    private firebase: FirebaseClientService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {}
  generateForm() {
    let object = {};
    const name = document.getElementById('displayName') as any;
    if (this.readObjectValid(object)) {
      name.innerHTML = 'valid';
    } else {
      name.innerHTML = 'is not valid';
    }
  }
  readObjectValid(object: Object) {
    let isValid = false;
    //test
    return isValid;
  }
}

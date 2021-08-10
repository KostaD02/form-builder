import { Component, OnInit, Injectable } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FirebaseClientService } from './../../services/firebase-client.service';
import testJson from './../../../assets/myForm.json';
import { Property, Root } from '../../interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [FirebaseClientService],
})
export class HomePageComponent implements OnInit {
  clickedGenerate: boolean = false;
  testForm: Root = testJson;
  schemaObject: any = JSON.stringify(this.testForm);
  myForm: FormGroup = this.fb.group({});
  constructor(
    private firebase: FirebaseClientService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {}
  reset() {
    this.schemaObject = JSON.stringify(this.testForm);
    this.clickedGenerate = false;
    const h2Text = document.getElementById('displayName');
    h2Text!.innerHTML = `Waiting for input object`;
    h2Text!.style.color = 'black';
    document.getElementById('additionalText')!.innerHTML = ``;
    this.myForm.reset();
  }
  createForm() {
    let isValid = true;
    try {
      let tempObj = JSON.parse(this.schemaObject as any);
      if (tempObj.type == 'object') {
        this.generateForm(tempObj.properties);
        this.clickedGenerate = true;
        const h2Text = document.getElementById('displayName');
        h2Text!.innerHTML = `${tempObj.label}`;
        h2Text!.style.color = 'black';
        document.getElementById('additionalText')!.innerHTML = ``;
      } else {
        this.clickedGenerate = false;
        this.myForm.reset();
        const h2Text = document.getElementById('displayName');
        h2Text!.innerHTML = 'Invalid schema';
        h2Text!.style.color = 'red';
        document.getElementById(
          'additionalText'
        )!.innerHTML = `Expecting "object" at 0.type but insted got:${tempObj.type}`;
      }
    } catch (error) {
      if ((error = 'SyntaxError: Unexpected token u in JSON at position 0')) {
        const h2Text = document.getElementById('displayName');
        h2Text!.innerHTML = 'Invalid JSON';
        h2Text!.style.color = 'red';
      } else {
        Swal.fire(`${error}`);
      }
    }
  }
  generateForm(properties: Property[]) {
    for (const property of properties) {
      const validatorsToAdd = [];
      for (const [key, value] of Object.entries(property)) {
        switch (key) {
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'required':
            validatorsToAdd.push(Validators.required);
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'maximum':
            validatorsToAdd.push(Validators.max(value));
            break;
          case 'minimum':
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'inputType':
            if (value == 'email') validatorsToAdd.push(Validators.email);
            break;
          default:
            break;
        }
      }
      // if (property.type == 'array' && property.item) {
      //   this.myForm.addControl(property.name, new FormGroup({}));
      //   property.item.forEach((item, index) => {
      //     console.log('esaa:', item);
      //     if (
      //       this.myForm.get(`${property.name}`) &&
      //       this.myForm.get(`${property.name}`) instanceof FormGroup
      //     ) {
      //       (this.myForm.get(`${property.name}`) as FormGroup).addControl(
      //         `${item.name}${index}`,
      //         new FormGroup({})
      //       );
      //     }
      //     item.properties.forEach((nestedItem) => {
      //       console.log(nestedItem);
      //       if (
      //         this.myForm.get(`${item.name}${index}`) &&
      //         this.myForm.get(`${item.name}${index}`) instanceof FormGroup
      //       ) {
      //         (this.myForm.get(`${item.name}${index}`) as FormGroup).addControl(
      //           `${nestedItem.name}`,
      //           this.fb.control('', [])
      //         );
      //       }
      //     });
      //   });
      // } else {
      this.myForm.addControl(
        property.name,
        this.fb.control('', validatorsToAdd)
      );
      //}
    }
    // console.log('form valid:', this.myForm.valid);
    // console.log('form values:', this.myForm.value);
  }
  submitForm(form: FormGroup) {
    this.firebase.createUser(form.value);
    Swal.fire({
      title: '<strong>Sumbitted form</strong>',
      html: `${JSON.stringify(form.value, null, 4)}`,
      focusConfirm: true,
    });
    this.myForm.reset();
  }
}

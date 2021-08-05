import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [FirebaseClientService],
})
export class HomePageComponent implements OnInit {
  clickedGenerate: boolean = false;
  schemaObject!: Root;
  testForm: Root = testJson;
  myForm: FormGroup = this.fb.group({});
  constructor(
    private firebase: FirebaseClientService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    console.log(this.testForm);
  }
  createForm() {
    this.clickedGenerate = true;
    this.generateForm(this.testForm.properties);
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
      if (property.type == 'array' && property.item) {
        this.myForm.addControl(property.name, new FormGroup({}));
        property.item.forEach((item, index) => {
          console.log('esaa:', item);
          if (
            this.myForm.get(`${property.name}`) &&
            this.myForm.get(`${property.name}`) instanceof FormGroup
          ) {
            (this.myForm.get(`${property.name}`) as FormGroup).addControl(
              `${item.name}${index}`,
              new FormGroup({})
            );
          }
          item.properties.forEach((nestedItem) => {
            console.log(nestedItem);
            if (
              this.myForm.get(`${item.name}${index}`) &&
              this.myForm.get(`${item.name}${index}`) instanceof FormGroup
            ) {
              (this.myForm.get(`${item.name}${index}`) as FormGroup).addControl(
                nestedItem.name,
                new FormControl('', [])
              );
            }
          });
        });
      } else {
        this.myForm.addControl(
          property.name,
          this.fb.control('', validatorsToAdd)
        );
      }
    }
    // console.log('form valid:', this.myForm.valid);
    // console.log('form values:', this.myForm.value);
  }
  submitForm(form: FormGroup) {
    console.log(form.getRawValue());
  }
}

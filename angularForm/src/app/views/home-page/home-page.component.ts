import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { FirebaseClientService } from './../../services/firebase-client.service';
import testJson from './../../../assets/myForm.json';
interface Root {
  type: string;
  name: string;
  label: string;
  properties: Property[];
}

interface Property {
  type: string;
  name: string;
  label: string;
  required?: boolean;
  inputType?: string;
  options?: Option[];
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  integer?: boolean;
  minimum?: number;
  maximum?: number;
  item?: Item;
  multiline?: boolean;
  properties?: Property3[];
}

interface Option {
  value: string;
  label: string;
}

interface Item {
  type: string;
  name: string;
  properties: Property2[];
}

interface Property2 {
  type: string;
  name: string;
  label: string;
  required: boolean;
  integer?: boolean;
}

interface Property3 {
  type: string;
  name: string;
  label: string;
  required: boolean;
}

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
      this.myForm.addControl(
        property.name,
        this.fb.control('', validatorsToAdd)
      );
    }
    console.log('form valid:', this.myForm.valid);
    console.log('form values:', this.myForm.value);
  }
}

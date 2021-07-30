import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { FirebaseClientService } from './../../services/firebase-client.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [FirebaseClientService],
})
export class HomePageComponent implements OnInit {
  constructor(
    private firebase: FirebaseClientService,
    private fb: FormBuilder
  ) {}
  myForm!: FormGroup;
  ngOnInit(): void {
    this.myForm = this.fb.group({
      fullName: '',
      email: '',
      country: 'ge',
      phoneNumber: '',
      universityYears: '',
      currentPosition: '',
      plans: '',
      haveComputer: false,
      technologies: this.fb.array([]),
      technologiesFirstIndexItem: '',
      technologiesFirstIndexitem: '',
      github: '',
      linkedin: '',
      website: '',
      cv: '',
      links: this.fb.array([]),
      linksFirstIndexItem: '',
      linksFirstIndexitem: '',
    });
  }
  get technologiesForms() {
    return this.myForm.get('technologies') as FormArray;
  }
  get linksForms() {
    return this.myForm.get('links') as FormArray;
  }
  addLinks() {
    const links = this.fb.group({
      name: '',
      link: '',
    });
    this.linksForms.push(links);
  }
  deleteLinks(i: number) {
    this.linksForms.removeAt(i);
  }
  addTechnologies() {
    const technologies = this.fb.group({
      technology: '',
      experience: '',
    });
    this.technologiesForms.push(technologies);
  }
  deleteTechnologies(i: number) {
    this.technologiesForms.removeAt(i);
  }
  createUser(value: any) {
    value['technologies'].unshift({
      technology: value.technologiesFirstIndexItem,
      experience: value.technologiesFirstIndexitem,
    });
    delete value.technologiesFirstIndexItem;
    delete value.technologiesFirstIndexitem;
    value['links'].unshift({
      name: value.linksFirstIndexItem,
      link: value.linksFirstIndexitem,
    });
    delete value.linksFirstIndexItem;
    delete value.linksFirstIndexitem;
    console.log(value);
  }
}

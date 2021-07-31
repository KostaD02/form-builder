import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { FirebaseClientService } from './../../services/firebase-client.service';
import Swal from 'sweetalert2';
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
      projects: this.fb.array([]),
      projectsFirstIndexItem: '',
      projectsFirstIndexitem: '',
      links: {},
    });
  }
  get technologiesForms() {
    return this.myForm.get('technologies') as FormArray;
  }
  get projectsForms() {
    return this.myForm.get('projects') as FormArray;
  }
  addprojects() {
    const projects = this.fb.group({
      name: '',
      link: '',
    });
    this.projectsForms.push(projects);
  }
  deleteprojects(i: number) {
    this.projectsForms.removeAt(i);
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
  displayForm(data: any) {
    Swal.fire({
      title: '<strong>Sumbitted form</strong>',
      html: `${JSON.stringify(data, null, 4)}`,
      focusConfirm: true,
    });
    console.log(data);
    this.firebase.createUser(data);
    //this.myForm.reset(); optional to clear
  }
  createUser(value: any) {
    value['technologies'].unshift({
      technology: value.technologiesFirstIndexItem,
      experience: value.technologiesFirstIndexitem,
    });
    delete value.technologiesFirstIndexItem;
    delete value.technologiesFirstIndexitem;
    value['projects'].unshift({
      name: value.projectsFirstIndexItem,
      link: value.projectsFirstIndexitem,
    });
    delete value.projectsFirstIndexItem;
    delete value.projectsFirstIndexitem;
    value.links.github = value.github;
    value.links.linkedin = value.linkedin;
    value.links.website = value.website;
    value.links.cv = value.cv;
    delete value.github;
    delete value.linkedin;
    delete value.website;
    delete value.cv;
    this.displayForm(value);
  }
}

export class Links {
  public github: string;
  public linkedin: string;
  public website: string;
  public cvLink: string;
  constructor(
    Github: string,
    Linkedin: string,
    Website: string,
    CvLink: string
  ) {
    this.github = Github;
    this.linkedin = Linkedin;
    this.website = Website;
    this.cvLink = CvLink;
  }
}

export class Project {
  public name: string;
  public link: string;
  constructor(Name: string, Link: string) {
    this.name = Name;
    this.link = Link;
  }
}

export class Technologies {
  public technology: string;
  public experience: number;
  constructor(Technology: string, Experience: number) {
    this.technology = Technology;
    this.experience = Experience;
  }
}

export class User {
  public fullName: string;
  public email: string;
  public country: string;
  public phoneNumber: string;
  public universityYears: number;
  public technologies: Technologies[] = [];
  public currentPosition: string;
  public plans: string;
  public links: Links[];
  public projects: Project[];
  public haveComputer: boolean;
  constructor(
    FullName: string,
    Email: string,
    Country: string,
    PhoneNumber: string,
    universityYears: number,
    Technologies: Technologies[],
    CurrentPosition: string,
    Plans: string,
    Links: Links[],
    Projects: Project[],
    HaveComputer: boolean
  ) {
    this.fullName = FullName;
    this.email = Email;
    this.country = Country;
    this.phoneNumber = PhoneNumber;
    this.universityYears = universityYears;
    this.technologies = Technologies;
    this.currentPosition = CurrentPosition;
    this.plans = Plans;
    this.links = Links;
    this.projects = Projects;
    this.haveComputer = HaveComputer;
  }
}

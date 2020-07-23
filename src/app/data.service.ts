import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private candidates = new BehaviorSubject([
    {
      name : "Manas Kumar",
      gender : "Male",
      city : "Pune",
      status : "interview",
      skills : {
        skillTwo : "ASP .Net MVC",
        skillThree : "Angular JS",
        skillFour : "Angular 2/4/5",
        skillFive : "React JS"
      },
      isSelected : false,
      isRejected : false
    },
    {
      name : "Pankaj Thakre",
      gender : "Male",
      city : "Bangalore",
      status : "interview",
      skills : {
        skillOne : "C#",
        skillTwo : "ASP .Net MVC",
        skillThree : "Angular JS",
        skillFour : "Angular 2/4/5",
        skillFive : "React JS"
      },
      isSelected : false,
      isRejected : false
    },
    {
      name : "Brijesh Gutugade",
      gender : "Male",
      city : "Pune",
      status : "interview",
      skills : {
        skillOne : "C#",
        skillTwo : "ASP .Net MVC",
        skillThree : "Angular JS",
        skillFive : "React JS"
      },
      isSelected : false,
      isRejected : false
    }
  ]);
  candidateDetails = this.candidates.asObservable();

  constructor() { }

  updateCandidate(res) {
    this.candidates.next(res);
  }
}

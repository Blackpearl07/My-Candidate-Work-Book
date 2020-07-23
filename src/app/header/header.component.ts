import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  totalRecords = 0;
  totalSelected = 0;
  totalRejected = 0;
  constructor(private http: DataService) { }

  ngOnInit(): void {
      this.http.candidateDetails.subscribe(res => {
      this.totalRecords = Object.keys(res).length;
      let tempOne = 0, tempTwo = 0;
      for (let i=0; i<res.length; i++) {
        if (res[i].status == "selected") {
          tempOne = tempOne + 1;
        }
        else if (res[i].status == "rejected") {
          tempTwo = tempTwo + 1;
        }
      }
      this.totalSelected = tempOne;
      this.totalRejected = tempTwo;
  })
  }

}

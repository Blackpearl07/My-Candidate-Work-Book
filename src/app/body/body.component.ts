import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { DataService } from "../data.service";
import { MatDialog } from "@angular/material/dialog";
import {
  FormControl,
  Validators,
  FormGroup,
  ValidatorFn,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "body",
  templateUrl: "./body.component.html",
  styleUrls: ["./body.component.css"],
})
export class BodyComponent implements OnInit {
  candidate;
  query;
  isSelected = false;
  isRejected = false;
  constructor(private http: DataService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.http.candidateDetails.subscribe((res) => {
      this.candidate = res;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
  }

  selectCandidate(res) {
    for (let i = 0; i < this.candidate.length; i++) {
      if (this.candidate[i].name == res.name) {
        this.candidate[i].status = "selected";
        this.candidate[i].isSelected = true;
        this.http.updateCandidate(this.candidate);
      }
    }
  }

  rejectCandidate(res) {
    for (let i = 0; i < this.candidate.length; i++) {
      if (this.candidate[i].name == res.name) {
        this.candidate[i].status = "rejected";
        this.candidate[i].isRejected = true;
        this.http.updateCandidate(this.candidate);
      }
    }
  }
}

@Component({
  selector: "dialog-content-example-dialog",
  templateUrl: "dialog-content-example-dialog.html",
  styleUrls: ["./dialog-content.component.css"],
})
export class DialogContentExampleDialog {
  constructor(private http: DataService, private msg: MatSnackBar) {}
  candidate;
  candidateDetails;
  @ViewChild("successMessageTemplate")
  successMessageTemplate: TemplateRef<any>;
  form = new FormGroup({
    nameFormControl: new FormControl("", [Validators.required]),
    cityFormControl: new FormControl(""),
    genderFormControl: new FormControl("Male"),
    skills: new FormGroup(
      {
        skillOneFormControl: new FormControl(),
        skillTwoFormControl: new FormControl(),
        skillThreeFormControl: new FormControl(),
        skillFourFormControl: new FormControl(),
        skillFiveFormControl: new FormControl(),
      },
      requireCheckboxesToBeCheckedValidator()
    ),
  });

  addCandidate() {
    // console.log(this.form.value);
    // console.log(this.form.get('skills.skillFiveFormControl').value);
    this.http.candidateDetails.subscribe((res) => {
      this.candidate = res;
    });
    this.candidateDetails = [
      {
        name: this.form.get("nameFormControl").value,
        gender: this.form.get("genderFormControl").value,
        city: this.form.get("cityFormControl").value,
        status: "interview",
        skills: {
          skillOne: this.form.get("skills.skillOneFormControl").value
            ? "C#"
            : false,
          skillTwo: this.form.get("skills.skillTwoFormControl").value
            ? "ASP .Net MVC"
            : false,
          skillThree: this.form.get("skills.skillThreeFormControl").value
            ? "Angular JS"
            : false,
          skillFour: this.form.get("skills.skillFourFormControl").value
            ? "Angular 2/4/5"
            : false,
          skillFive: this.form.get("skills.skillFiveFormControl").value
            ? "React JS"
            : false,
        },
        isSelected: false,
        isRejected: false,
      },
    ];
    this.candidate = [...this.candidate, ...this.candidateDetails];
    this.http.updateCandidate(this.candidate);
    this.msg.openFromTemplate(this.successMessageTemplate, {
      duration: 2000,
    });
  }
}

export function requireCheckboxesToBeCheckedValidator(
  minRequired = 1
): ValidatorFn {
  return function validate(formGroup: FormGroup) {
    let checked = 0;

    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.controls[key];

      if (control.value === true) {
        checked++;
      }
    });

    if (checked < minRequired) {
      return {
        requireCheckboxesToBeChecked: true,
      };
    }

    return null;
  };
}

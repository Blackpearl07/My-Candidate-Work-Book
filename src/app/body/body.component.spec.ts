import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BodyComponent } from "./body.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { of } from "rxjs";
import { SearchPipe } from "./search.pipe";

const mockDialogRef = {
  afterClosed: () => {
    return of("proceed");
  },

  close: () => {},
};

const mockDialog = {
  open: () => {
    return mockDialogRef;
  },

  getDialogById: (id: string) => {
    return mockDialogRef;
  },
};

describe("BodyComponent", () => {
  let component: BodyComponent;
  let fixture: ComponentFixture<BodyComponent>;
  let pipe: SearchPipe;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // imports: [MatDialog],
      declarations: [BodyComponent, SearchPipe],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatDialogRef, useValue: mockDialogRef },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyComponent);
    component = fixture.componentInstance;
    pipe = new SearchPipe();
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call selectCandidate", () => {
    const res = {
      name: "Manas Kumar",
      gender: "Male",
      city: "Pune",
      status: "interview",
      skills: {
        skillTwo: "ASP .Net MVC",
        skillThree: "Angular JS",
        skillFour: "Angular 2/4/5",
        skillFive: "React JS",
      },
      isSelected: false,
      isRejected: false,
    };
    component.selectCandidate(res);
    expect(component.candidate[0].status).toBe("selected");
  });

  it("should call rejectCandidate", () => {
    const res = {
      name: "Manas Kumar",
      gender: "Male",
      city: "Pune",
      status: "interview",
      skills: {
        skillTwo: "ASP .Net MVC",
        skillThree: "Angular JS",
        skillFour: "Angular 2/4/5",
        skillFive: "React JS",
      },
      isSelected: false,
      isRejected: false,
    };
    component.rejectCandidate(res);
    expect(component.candidate[0].status).toBe("rejected");
  });
});

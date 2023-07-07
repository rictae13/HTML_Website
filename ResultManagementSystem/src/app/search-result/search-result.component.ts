import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  searchForm!: FormGroup;
  particularStudentData: any;
  roll: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private api: ApiService) { }
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      rollno: ['', Validators.required],
      dob: ['', Validators.required]
    })
  }


  search() {
    this.http.get<any>("http://localhost:3000/posts").
      subscribe(res => {
        //match roll number & date of birth     
        const user = res.find((a: any) => {
          return a.rollno == this.searchForm.value.rollno && a.dob == this.searchForm.value.dob
        })
        this.roll = this.searchForm.value.rollno;
        console.log(this.roll)
        if (user) {
          alert("login successfully");
          this.searchForm.reset();
          this.api.getStudentByRollno(this.roll)
            .subscribe(res => {
              console.log(res)
              this.particularStudentData = res;
              const rollNumber = this.particularStudentData[0].rollno;
              const name = this.particularStudentData[0].name;
              const dob = this.particularStudentData[0].dob;
              const score = this.particularStudentData[0].score;
            })
        } else {
          alert("User not found");
        }

      }, err => {
        alert("Something went wrong");
      })
  }
}

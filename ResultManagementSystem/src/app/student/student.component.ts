import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { studentdata } from './student.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  //hide
  showadd!: boolean;
  showupdate!: boolean;

  studentmodelobj: studentdata = new studentdata
  allStudentData: any;

  formValue!: FormGroup
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      rollno: ['', Validators.required],
      name: ['', Validators.required],
      dob: ['', Validators.required],
      score: ['', Validators.required]
    })
    this.getdata()
  }
  //to hide on add
  add() {
    this.showadd = true;
    this.showupdate = false;

  }
  //to hide on update
  edit(data: any) {
    this.showadd = false;
    this.showupdate = true;
    this.studentmodelobj.id = data.id;

    this.formValue.controls['rollno'].setValue(data.rollno)
    this.formValue.controls['name'].setValue(data.name)
    this.formValue.controls['dob'].setValue(data.dob)
    this.formValue.controls['score'].setValue(data.score)

  }
  //update on edit
  update() {
    this.studentmodelobj.rollno = this.formValue.value.rollno;
    this.studentmodelobj.name = this.formValue.value.name;
    this.studentmodelobj.dob = this.formValue.value.dob;
    this.studentmodelobj.score = this.formValue.value.score;

    this.api.updateStudent(this.studentmodelobj, this.studentmodelobj.id).subscribe(res => {
      this.formValue.reset();
      this.getdata();
      alert("Record updated succesfully")
    },
      err => {
        alert("Something went wrong")
      })
  }

  addStudent() {
    this.studentmodelobj.rollno = this.formValue.value.rollno;
    this.studentmodelobj.name = this.formValue.value.name;
    this.studentmodelobj.dob = this.formValue.value.dob;
    this.studentmodelobj.score = this.formValue.value.score;

    this.api.postStudent(this.studentmodelobj).subscribe(res => {
      console.log(res)
      this.formValue.reset()
      this.getdata()
      alert("Record added successfully")
    },
      err => {
        alert("Something went wrong")
      }
    )

  }

  //getdata
  getdata() {
    this.api.getStudent()
      .subscribe(res => {
        this.allStudentData = res;
      })
  }

  //delete
  deleteStudent(data: any) {
    if (confirm('Are you sure to delete'))
      this.api.deleteStudent(data.id)
        .subscribe(res => {
          this.getdata();
          alert("Record deleted succesfully")
        })
  }

}

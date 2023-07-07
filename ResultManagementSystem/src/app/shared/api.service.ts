import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private _http: HttpClient) { }
  postStudent(data: any) {
    return this._http.post<any>("http://localhost:3000/posts", data).
      pipe(map((res: any) => {
        return res;
      }))
  }

  getStudent() {
    return this._http.get<any>("http://localhost:3000/posts").
      pipe(map((res: any) => {
        return res;
      }))
  }

  getStudentByRollno(rollno: string) {
    return this._http.get<any>("http://localhost:3000/posts?rollno=" + rollno).
      pipe(map((res: any) => {
        return res;
      }));
  }

  //update
  updateStudent(data: any, id: number) {
    return this._http.put("http://localhost:3000/posts/" + id, data).
      pipe(map((res: any) => {
        return res;
      }))

  }
  //delete
  deleteStudent(id: number) {
    return this._http.delete("http://localhost:3000/posts/" + id).
      pipe(map((res: any) => {
        return res;
      }))
  }
}

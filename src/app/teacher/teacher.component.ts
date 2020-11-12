import { Component, OnInit } from '@angular/core';
import {StorageService} from '../services/storage.service';
import {Router} from '@angular/router';
import {HttpService} from "../services/http.service";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  teacher;
  approvedApts;
  waitApts;
  students;

  constructor(private storageService: StorageService, private router: Router,
              private httpService: HttpService) {
    this.teacher = storageService.getLocalUser();
    if (!this.teacher || this.teacher.role !== 'teacher') {
      router.navigateByUrl('/login');
    }


    httpService.getAllStudents().subscribe(student => {
      this.students = student;
      httpService.getTeacherApprovedApts(this.teacher.id).subscribe(data => this.approvedApts = data);
      httpService.getTeacherWaitApts(this.teacher.id).subscribe(data => this.waitApts = data);
    });

  }

  ngOnInit() {
  }

  logout() {
    this.storageService.removeLocalUser();
    this.router.navigateByUrl('/login');
  }

  toDateString(date) {
    return new Date(date).toLocaleDateString() + ' ' + new Date(date).toLocaleTimeString();
  }

  getStudentStringFromId(id) {
    let student = this.students.find(elem => elem.ogrenciId === id);
    return 'Öğrenci Adı Soyadı: ' + student.adi + ' ' + student.soyadi;
  }

  approveClick(id, index) {
    this.approvedApts.push(this.waitApts[index]);
    this.waitApts.splice(index, 1);
    this.httpService.approveProgram(id).subscribe(data=>console.log(data));
  }

  deleteClick(id, index) {
    this.waitApts.splice(index, 1);
    this.httpService.removeProgram(id).subscribe(data=>console.log(data));
  }
}

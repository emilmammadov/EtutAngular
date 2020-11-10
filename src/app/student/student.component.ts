import { Component, OnInit } from '@angular/core';
import {StorageService} from '../services/storage.service';
import {Router} from '@angular/router';
import {HttpService} from "../services/http.service";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  teachers;
  lectures;
  selectedTeacher;
  randevu = {};

  constructor(private storageService: StorageService, private router: Router, private httpService: HttpService) {
    let user = storageService.getLocalUser();
    if (!user || user.role !== 'student') {
      router.navigateByUrl('/login');
    }

    httpService.getAllTeachers().subscribe(tchrs => {
      this.teachers = tchrs;
      httpService.getAllLectures().subscribe(lctrs => {
        this.lectures = lctrs;
        this.teachers.forEach(tchr => {
          tchr.dersAdi = this.lectures.find(elem => elem.id === tchr.dersId).dersAdi
        });
        console.log("teachers", this.teachers);
      });
    });
  }

  ngOnInit() {
  }

  logout() {
    this.storageService.removeLocalUser();
    this.router.navigateByUrl('/login');
  }
}

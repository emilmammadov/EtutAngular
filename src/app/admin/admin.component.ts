import { Component, OnInit } from '@angular/core';
import {StorageService} from '../services/storage.service';
import {Router} from '@angular/router';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  student = {
    adi: '',
    soyadi: '',
    username: '',
    password: ''
  };
  teacher = {
    adi: '',
    soyadi: '',
    username: '',
    password: '',
    dersId: 1
  };

  dersler;
  selectedLecture;
  lectureName;

  constructor(private storageService: StorageService,
              private router: Router,
              private httpService: HttpService) {
    httpService.getAllLectures().subscribe(data => {
      this.dersler = data;
    });
    let user = storageService.getLocalUser();
    if (!user || user.role !== 'admin') {
      router.navigateByUrl('/login');
    }
  }

  ngOnInit() {
  }

  logout() {
    this.storageService.removeLocalUser();
    this.router.navigateByUrl('/login');
  }

  addStudent() {
    this.httpService.addStudent(this.student).subscribe(data => {
      console.log("data", data);
      this.student = {
        adi: '',
        soyadi: '',
        username: '',
        password: ''
      };
    });
  }

  addTeacher() {
    this.teacher.dersId = this.dersler.find(elem => elem.dersAdi === this.selectedLecture).id;
    this.httpService.addTeacher(this.teacher).subscribe(data => {
      this.teacher = {
        adi: '',
        soyadi: '',
        username: '',
        password: '',
        dersId: 1
      };
    });
  }

  addLecture() {
    this.httpService.addLecture(this.lectureName).subscribe(data => {
      this.lectureName = '';
    })
  }
}

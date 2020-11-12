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
  student;
  lectures;
  selectedTeacherId;
  randevu: any = {startTime: '16:00', endTime: '17:30', date: new Date()};
  approvedPrograms :any = [];

  constructor(private storageService: StorageService, private router: Router, private httpService: HttpService) {
    this.student = storageService.getLocalUser();
    if (!this.student || this.student.role !== 'student') router.navigateByUrl('/login');

    httpService.getAllTeachers().subscribe(tchrs => {
      this.teachers = tchrs;
      httpService.getStudentApprovedApts(this.student.ogrenciId).subscribe(data=>this.approvedPrograms = data);
      httpService.getAllLectures().subscribe(lctrs => {
        this.lectures = lctrs;
        this.teachers.forEach(tchr => {
          tchr.dersAdi = this.lectures.find(elem => elem.id === tchr.dersId).dersAdi
        });
      });
    });
  }

  ngOnInit() {
  }

  logout() {
    this.storageService.removeLocalUser();
    this.router.navigateByUrl('/login');
  }

  btnAddClick() {
    if (this.randevu.startTime < '16:00' && this.randevu.endTime > '17:30') {
      alert('Etüt saati 16:00 ile 17:30 arasında olmalıdır');
      return;
    } else if (this.randevu.startTime > this.randevu.endTime) {
      alert('Başlama saati bitiş saatinden sonra olamaz');
      return;
    }

    let startTime = this.randevu.startTime.split(':');
    let endTime = this.randevu.endTime.split(':');

    let program = {
      ogretmenId: this.selectedTeacherId,
      ogrenciId: this.student.ogrenciId,
      randevuStart: new Date(this.randevu.date).setHours(startTime[0], startTime[1]),
      randevuEnd: new Date(this.randevu.date).setHours(endTime[0], endTime[1]),
      status: 0
    };
    this.httpService.addProgram(program).subscribe(data => {
      if (!data) alert('Bu saat aralığı müsait değil');
      else alert('Randevu talebiniz alınmıştır');
    });

  }

  getTeacherStringFromId(id) {
    let tchr = this.teachers.find(elem => elem.id === id);
    return 'Öğretmen Adı Soyadı: ' + tchr.adi + ' ' + tchr.soyadi;
  }

  toDateString(date) {
    return new Date(date).toLocaleDateString() + ' ' + new Date(date).toLocaleTimeString();
  }
}

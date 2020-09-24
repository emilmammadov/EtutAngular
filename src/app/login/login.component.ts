import { Component, OnInit } from '@angular/core';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username;
  password;
  headers = ["Admin", "Öğretmen", "Öğrenci"];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
  }

  loginClick(i: number) {
    let url;
    if (i === 0) url = 'admin/login';
    else if (i === 1) url = 'teacher/login';
    else url = 'student/login';
    this.httpService.login(this.username, this.password, url).subscribe(data => {
      console.log(data);
    });
  }
}

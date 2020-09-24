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
    this.httpService.getAllAdmins().subscribe(data => {
      console.log(data);
    });
  }
}

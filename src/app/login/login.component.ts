import { Component, OnInit } from '@angular/core';
import {HttpService} from '../services/http.service';
import {StorageService} from '../services/storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username;
  password;
  headers = ["Admin", "Teacher", "Student"];
  roles = ['admin', 'teacher', 'student'];

  constructor(private httpService: HttpService,
              private storageService: StorageService,
              private router: Router) {
    if (storageService.getLocalUser() && storageService.getLocalUser().role) {
      router.navigateByUrl('/'+storageService.getLocalUser().role);
    }
  }

  ngOnInit() {
  }

  loginClick(i: number) {
    let url = `${this.roles[i]}/login`;
    this.httpService.login(this.username, this.password, url).subscribe(data => {
      if (data) {
        this.storageService.setLocalUser(data, this.roles[i]);
        this.router.navigateByUrl('/'+this.roles[i]);
      }
    });
  }
}

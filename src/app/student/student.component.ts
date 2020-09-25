import { Component, OnInit } from '@angular/core';
import {StorageService} from '../services/storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(storageService: StorageService, router: Router) {
    let user = storageService.getLocalUser();
    if (!user || user.role !== 'student') {
      router.navigateByUrl('/login');
    }
  }

  ngOnInit() {
  }

}

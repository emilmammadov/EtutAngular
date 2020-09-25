import { Component, OnInit } from '@angular/core';
import {StorageService} from '../services/storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  constructor(storageService: StorageService, router: Router) {
    let user = storageService.getLocalUser();
    if (!user || user.role !== 'teacher') {
      router.navigateByUrl('/login');
    }
  }

  ngOnInit() {
  }

}

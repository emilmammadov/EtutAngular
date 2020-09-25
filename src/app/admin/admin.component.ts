import { Component, OnInit } from '@angular/core';
import {StorageService} from '../services/storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(storageService: StorageService, router: Router) {
    let user = storageService.getLocalUser();
    if (!user || user.role !== 'admin') {
      router.navigateByUrl('/login');
    }
  }

  ngOnInit() {
  }

}

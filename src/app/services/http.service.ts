import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  login(username, password, url) {
    return this.http.post(`${HttpClientHelper.baseURL}${url}`, {username, password});
  }

  addTeacher(teacher) {
    let url = 'admin/ogretmenekle';
    return this.http.post(`${HttpClientHelper.baseURL}${url}`, teacher);
  }

  addStudent(student) {
    let url = 'admin/ogrenciekle';
    return this.http.post(`${HttpClientHelper.baseURL}${url}`, student);
  }

  getAllLectures() {
    let url = 'ders/all';
    return this.http.get(`${HttpClientHelper.baseURL}${url}`);
  }
}

export class HttpClientHelper{

  static baseURL: string = 'http://127.0.0.1:1842/';
}


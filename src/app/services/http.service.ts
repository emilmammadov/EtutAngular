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

  getAllTeachers() {
    let url = 'teacher/all';
    return this.http.get(`${HttpClientHelper.baseURL}${url}`);
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

  addLecture(name) {
    let url = 'ders/add';
    return this.http.post(`${HttpClientHelper.baseURL}${url}`, {dersAdi: name});
  }
}

export class HttpClientHelper{

  static baseURL: string = 'http://127.0.0.1:1842/';
}


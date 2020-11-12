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

  getAllStudents() {
    let url = 'student/all';
    return this.http.get(`${HttpClientHelper.baseURL}${url}`);
  }

  getAllLectures() {
    let url = 'ders/all';
    return this.http.get(`${HttpClientHelper.baseURL}${url}`);
  }

  addLecture(name) {
    let url = 'ders/add';
    return this.http.post(`${HttpClientHelper.baseURL}${url}`, {dersAdi: name});
  }

  addProgram(program) {
    let url = 'program/add';
    return this.http.post(`${HttpClientHelper.baseURL}${url}`, program);
  }

  getStudentApprovedApts(ogrenciId) {
    let url = 'program/student-approved';
    return this.http.post(`${HttpClientHelper.baseURL}${url}`, ogrenciId);
  }

  getTeacherApprovedApts(teacherId) {
    let url = 'program/teacher-approved';
    return this.http.post(`${HttpClientHelper.baseURL}${url}`, teacherId);
  }

  getTeacherWaitApts(teacherId) {
    let url = 'program/teacher-wait';
    return this.http.post(`${HttpClientHelper.baseURL}${url}`, teacherId);
  }

  removeProgram(id) {
    let url = 'program/delete';
    return this.http.post(`${HttpClientHelper.baseURL}${url}`, id);
  }

  approveProgram(id) {
    let url = 'program/approve';
    return this.http.post(`${HttpClientHelper.baseURL}${url}`, id);
  }
}

export class HttpClientHelper{

  static baseURL: string = 'http://127.0.0.1:1842/';
}


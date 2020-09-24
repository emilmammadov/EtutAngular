import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getAllAdmins() {
    return this.http.get(`${HttpClientHelper.baseURL}/admin/adminlerilistele`);
  }
}

export class HttpClientHelper{

  static baseURL: string = 'http://127.0.0.1:1842';
}


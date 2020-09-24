import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {StudentComponent} from './student/student.component';
import {TeacherComponent} from './teacher/teacher.component';
import {LoginComponent} from './login/login.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'student',
    component: StudentComponent
  },
  {
    path: 'teacher',
    component: TeacherComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

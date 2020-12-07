import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }


  setStudentLevel(userId, body): Observable<any> {
    return this.http.put('/user/student/set/level/' + userId, body);
  }
  getAllTeachersOfLevel(sessionId): Observable<any> {
    return this.http.get('/user/teacher/all/by/level/' + sessionId);
  }
  setTeacherLevel(userId, body): Observable<any> {
    return this.http.put('/user/teacher/set/level/class/type/' + userId, body);
  }

  getAllStudents(body): Observable<any> {
    return this.http.post('/user/get/all/students', body);
  }

  getAllTeachers(body): Observable<any> {
    return this.http.post('/user/get/all/teachers', body);
  }

  deleteTeacher(teacherId): Observable<any> {
    return this.http.delete('/user/teacher/' + teacherId);
  }

  deleteStudent(studentId): Observable<any> {
    return this.http.delete('/user/student/' + studentId);
  }

  blockStudent(studentId): Observable<any> {
    return this.http.get('/user/block/student/' + studentId);
  }

  unblockStudent(studentId): Observable<any> {
    return this.http.get('/user/unblock/student/' + studentId);
  }

  blockTeacher(teacherId): Observable<any> {
    return this.http.get('/user/block/teacher/' + teacherId);
  }

  unblockTeacher(teacherId): Observable<any> {
    return this.http.get('/user/unblock/teacher/' + teacherId);
  }

  getStudentDetails(studentId): Observable<any> {
    return this.http.get('/user/student/details/' + studentId);
  }

  getStudentQuizDetails(studentId): Observable<any> {
    return this.http.get('/quiz/user/student/details/' + studentId);
  }

  getTeacherProfileDetails(teacherId): Observable<any> {
    return this.http.get('/user/teacher/details/' + teacherId);
  }

  getTeacherDemoClassDetails(teacherId): Observable<any> {
    return this.http.get('/demo_class/teacher/by/admin/' + teacherId);
  }

  getDemoClassesForAssignment(): Observable<any> {
    return this.http.get('/demo_class/all/for/assignment');
  }

  getTeacherContractDetails(teacherId): Observable<any> {
    return this.http.get('/contract/teacher/by/admin/' + teacherId);
  }

  getContractsForAssignment(): Observable<any> {
    return this.http.get('/contract/for/assignment');
  }

  assignDemoClassANdUpdateTeacherLevel(teacherId, body): Observable<any> {
    return this.http.put('/demo_class/teacher/assign/demo/class/n/approve/info/' + teacherId, body);
  }

  assignContractANdUpdateTeacherLevel(teacherId, body): Observable<any> {
    return this.http.put('/contract/teacher/assign/contract/n/approve/info/' + teacherId, body);
  }

  declineTeacherAcademicInfo(teacherId): Observable<any> {
    return this.http.put('/user/teacher/decline/onboarding/personal/academic/info/' + teacherId, {});
  }

  declineTeacherDemoClass(teacherId): Observable<any> {
    return this.http.put('/demo_class/teacher/decline/demo/class/' + teacherId, {});
  }
  conditionalizeTeacherDemoClass(teacherId): Observable<any> {
    return this.http.put('/demo_class/teacher/conditionalize/demo/class/' + teacherId, {});
  }

}

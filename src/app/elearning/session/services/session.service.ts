import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private http: HttpClient) { }

  getSessionInfo(sessionId): Observable<any> {
    return this.http.get('/session/' + sessionId);
  }
  create(body): Observable<any> {
    return this.http.post('/session/create', body);
  }
  updateSessionInfo(sessionId, body): Observable<any> {
    return this.http.put('/session/' + sessionId, body);
  }
  activateSessionInfo(sessionId): Observable<any> {
    return this.http.put('/session/activate/' + sessionId, {});
  }
  deactivateSessionInfo(sessionId): Observable<any> {
    return this.http.put('/session/deactivate/' + sessionId, {});
  }
  getAllSessions(body): Observable<any> {
    return this.http.post('/session/get/all', body);
  }
  deleteSession(sessionId): Observable<any> {
    return this.http.delete('/session/' + sessionId);
  }
  getSesionEnrolments(sessionId): Observable<any> {
    return this.http.get('/session/enrollment/' + sessionId);
  }
  getWaitingEnrollmentsForAssignment(sessionId): Observable<any> {
    return this.http.get('/enrollment/all/for/assignment/' + sessionId);
  }

  addStudentInEnrollment(body): Observable<any> {
    return this.http.post('/session/enrollment/add/student', body);
  }

  addTeacherInEnrollment(body): Observable<any> {
    return this.http.post('/session/enrollment/add/teacher', body);
  }
  removeTeacherInEnrollment(sessionId, body): Observable<any> {
    return this.http.put('/session/enrollment/remove/teacher/' + sessionId, body);
  }
  removeStudentInEnrollment(sessionId, body): Observable<any> {
    return this.http.put('/session/enrollment/remove/student/' + sessionId, body);
  }
  getAllEnrollments(body): Observable<any> {
    return this.http.post('/enrollment/get/all', body);
  }


}

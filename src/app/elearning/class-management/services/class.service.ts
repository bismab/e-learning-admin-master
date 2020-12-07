import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  constructor(private http: HttpClient) { }

  createDemoClass(body): Observable<any> {
    return this.http.post('/demo_class/create', body);
  }

  updateDemoClass(classId, body): Observable<any> {
    return this.http.put('/demo_class/' + classId, body);
  }

  getAllDemoClasses(body): Observable<any> {
    return this.http.post('/demo_class/get/all', body);
  }

  activateDemoClass(classId): Observable<any> {
    return this.http.put('/demo_class/activate/' + classId, {});
  }

  deactivateDemoClass(classId): Observable<any> {
    return this.http.put('/demo_class/deactivate/' + classId, {});
  }

  deleteDemoClass(classId): Observable<any> {
    return this.http.delete('/demo_class/' + classId);
  }

  getDemoClass(classId): Observable<any> {
    return this.http.get('/demo_class/for/admin/' + classId);
  }

  getAllTypes(body): Observable<any> {
    return this.http.post('/class/type/get/all', body);
  }
  createtype(body): Observable<any> {
    return this.http.post('/class/type/create', body);
  }

  updateType(typeId, body): Observable<any> {
    return this.http.put('/class/type/' + typeId, body);
  }

  deleteType(typeId): Observable<any> {
    return this.http.delete('/class/type/' + typeId);
  }

  activatetype(typeId): Observable<any> {
    return this.http.put('/class/type/activate/' + typeId, {});
  }


  deactivateType(typeId): Observable<any> {
    return this.http.put('/class/type/deactivate/' + typeId, {});
  }

  getAllActiveTypes(): Observable<any> {
    return this.http.get('/class/type/all/a');
  }

  getTypeInfo(typeId): Observable<any> {
    return this.http.get('/class/type/' + typeId);
  }
}

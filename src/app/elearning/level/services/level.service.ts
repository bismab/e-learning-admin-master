import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  constructor(private http: HttpClient) { }

  getAllLevels(body): Observable<any> {
    return this.http.post('/level/get/all', body);
  }
  createLevel(body): Observable<any> {
    return this.http.post('/level/create', body);
  }

  updateLevel(levelId, body): Observable<any> {
    return this.http.put('/level/' + levelId, body);
  }

  deleteLevel(levelId): Observable<any> {
    return this.http.delete('/level/' + levelId);
  }

  activateLevel(levelId): Observable<any> {
    return this.http.put('/level/activate/' + levelId, {});
  }


  deactivateLevel(levelId): Observable<any> {
    return this.http.put('/level/deactivate/' + levelId, {});
  }

  getAllActiveLevels(): Observable<any> {
    return this.http.get('/level/all/a');
  }

  getLevelInfo(levelId): Observable<any> {
    return this.http.get('/level/' + levelId);
  }

}

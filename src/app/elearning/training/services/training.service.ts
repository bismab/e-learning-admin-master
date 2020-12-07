import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  constructor(private http: HttpClient) { }
  //question
  createQuestion(body): Observable<any> {
    return this.http.post('/training/question/create', body);
  }
  activateQuestion(questionId): Observable<any> {
    return this.http.put('/training/question/activate/' + questionId, {});
  }
  deactivateQuestion(questionId): Observable<any> {
    return this.http.put('/training/question/deactivate/' + questionId, {});
  }
  deleteQuestion(questionId): Observable<any> {
    return this.http.delete('/training/question/' + questionId);
  }
  getQuestionDetails(questionId): Observable<any> {
    return this.http.get('/training/question/' + questionId);
  }
  getQuestionsOfTraining(trainingId): Observable<any> {
    return this.http.get('/training/question/all/of/' + trainingId);
  }
  getAllQuestions(body): Observable<any> {
    return this.http.post('/training/question/get/all', body);
  }
  updateQuestion(questionId, body): Observable<any> {
    return this.http.put('/training/question/' + questionId, body);
  }

  //training
  createTraining(body): Observable<any> {
    return this.http.post('/training/create', body);
  }
  activateTraining(trainingId): Observable<any> {
    return this.http.put('/training/activate/' + trainingId, {});
  }
  deactivateTraining(trainingId): Observable<any> {
    return this.http.put('/training/deactivate/' + trainingId, {});
  }
  deleteTraining(trainingId): Observable<any> {
    return this.http.delete('/training/' + trainingId);
  }
  getTrainingDetails(trainingId): Observable<any> {
    return this.http.get('/training/' + trainingId);
  }
  getAllTrainings(body): Observable<any> {
    return this.http.post('/training/get/all', body);
  }
  updateTraining(trainingId, body): Observable<any> {
    return this.http.put('/training/' + trainingId, body);
  }
}

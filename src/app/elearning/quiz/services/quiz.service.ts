import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private http: HttpClient) { }
  //question
  createQuestion(body): Observable<any> {
    return this.http.post('/quiz/question/create', body);
  }
  activateQuestion(questionId): Observable<any> {
    return this.http.put('/quiz/question/activate/' + questionId, {});
  }
  deactivateQuestion(questionId): Observable<any> {
    return this.http.put('/quiz/question/deactivate/' + questionId, {});
  }
  deleteQuestion(questionId): Observable<any> {
    return this.http.delete('/quiz/question/' + questionId);
  }
  getQuestionDetails(questionId): Observable<any> {
    return this.http.get('/quiz/question/' + questionId);
  }
  getQuestionsOfQuiz(quizId): Observable<any> {
    return this.http.get('/quiz/question/all/of/' + quizId);
  }
  getAllQuestions(body): Observable<any> {
    return this.http.post('/quiz/question/get/all', body);
  }
  getQuestionsForPlacement(forUser): Observable<any> {
    return this.http.get('/quiz/question/for/placement/' + forUser);
  }
  updateQuestion(questionId, body): Observable<any> {
    return this.http.put('/quiz/question/' + questionId, body);
  }
  //quiz
  createQuiz(body): Observable<any> {
    return this.http.post('/quiz/create', body);
  }
  activateQuiz(quizId): Observable<any> {
    return this.http.put('/quiz/activate/' + quizId, {});
  }
  deactivateQuiz(quizId): Observable<any> {
    return this.http.put('/quiz/deactivate/' + quizId, {});
  }
  deleteQuiz(quizId): Observable<any> {
    return this.http.delete('/quiz/' + quizId);
  }
  getQuizDetails(quizId): Observable<any> {
    return this.http.get('/quiz/' + quizId);
  }
  getAllQuizes(body): Observable<any> {
    return this.http.post('/quiz/get/all', body);
  }
  updateQuiz(quizId, body): Observable<any> {
    return this.http.put('/quiz/' + quizId, body);
  }
}

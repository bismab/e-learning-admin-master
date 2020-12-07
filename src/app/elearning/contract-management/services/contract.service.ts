import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  constructor(private http: HttpClient) { }

  getAllContracts(body): Observable<any> {
    return this.http.post('/contract/get/all', body);
  }

  createContract(body): Observable<any> {
    return this.http.post('/contract/create', body);
  }

  updateContract(contractId, body): Observable<any> {
    return this.http.put('/contract/' + contractId, body);
  }

  activateContract(contractId): Observable<any> {
    return this.http.put('/contract/activate/' + contractId, {});
  }


  deactivateContract(contractId): Observable<any> {
    return this.http.put('/contract/deactivate/' + contractId, {});
  }

  deleteContract(contractId): Observable<any> {
    return this.http.delete('/contract/' + contractId);
  }

  getContractInfo(contractId): Observable<any> {
    return this.http.get('/contract/for/admin/' + contractId);
  }

  getContractTemplatesForAssignment(): Observable<any> {
    return this.http.get('/contract/template/all/for/assignment');
  }

}

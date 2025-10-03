import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PartyCodeDTO } from '../models/Party/PartyCodeDTO';
import { Result } from '../models/Result';
import { GeneratePartyCodeCommand } from '../models/Party/GeneratePartyCodeCommand';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:7044/api'; //Remove this hardcoding later

  constructor(private http: HttpClient) { }

  generatePartyCode(payload: GeneratePartyCodeCommand): Observable<Result<PartyCodeDTO>> {
    return this.http.post<Result<PartyCodeDTO>>(`${this.baseUrl}/Party/GeneratePartyCode`, payload);
  }
}

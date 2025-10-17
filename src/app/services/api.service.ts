import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PartyCodeDTO } from '../interfaces/IPartyCodeDTO';
import { Result } from '../models/Result';
import { GeneratePartyCodeCommand } from '../models/Party/GeneratePartyCodeCommand';
import { PartyInfoDTO } from '../interfaces/IPartyInfoDTO';
import { GetPartyInformationCommand } from '../models/Party/GetPartyInformationCommand';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:7044/api'; //Remove this hardcoding later

  constructor(private http: HttpClient) { }

  generatePartyCode(payload: GeneratePartyCodeCommand): Observable<Result<PartyCodeDTO>> {
    return this.http.post<Result<PartyCodeDTO>>(`${this.baseUrl}/Party/GeneratePartyCode`, payload);
  }

  getPartyInformation(payload: GetPartyInformationCommand): Observable<Result<PartyInfoDTO>> {
    return this.http.post<Result<PartyInfoDTO>>(`${this.baseUrl}/Party/GetPartyInformation`, payload);
  }
}

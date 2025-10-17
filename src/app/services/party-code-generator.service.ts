import { Injectable } from '@angular/core';
import { Contribution } from '../interfaces/IContribution';
import { Expense } from '../interfaces/IExpenses';
import { PartyInfoDTO } from '../interfaces/IPartyInfoDTO';
import { firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';
import { ErrorCodes } from '../common/errors';
import { Result } from '../models/Result';
import { PartyCodeDTO } from '../interfaces/IPartyCodeDTO';


// Mock data
const mockExpenses: Expense[] = [
  { id: 1, name: 'Dinner at Restaurant', amount: 120, paidBy: 'Alice', tag: 'Food'},
  { id: 2, name: 'Uber Ride', amount: 25, paidBy: 'Bob', tag: 'Transport' },
  { id: 3, name: 'Movie Tickets', amount: 60, paidBy: 'Charlie', tag: 'Entertainment' }
];

const mockContributions: Contribution[] = [
  { id: 1, name: 'David', amount: 50, tags: ['Food', 'Dinner'] },
  { id: 2, name: 'Eve', amount: 30, tags: ['Transport', 'Entertainment'] }
];

const allTags = ['Food', 'Transport', 'Entertainment', 'Snacks', 'Drinks', 'Shopping', 'Smokes', 'Accommodation', 'Miscellaneous'];


@Injectable({
  providedIn: 'root'
})
export class PartyCodeGeneratorService {

  parties = [{partyName: 'Weekend Trip Expenses', partyCode: 'ABCD-1234', expenses: mockExpenses, contributions: mockContributions}];

  constructor(private api:ApiService) { }

    getTags(): string[]
    {
      return allTags;
    }

    async getPartyInfo(partyCode: string): Promise<Result<PartyInfoDTO>>
    {
      const result = await firstValueFrom(this.api.getPartyInformation({ partyCode }));

      const resultDTO:Result<PartyInfoDTO> = {success: true, data: result.data};

      return resultDTO;
    }

    async createPartyCode(partyName: string): Promise<Result<PartyCodeDTO>> 
    {
      try {
        const result = await firstValueFrom(
          this.api.generatePartyCode({ partyName })
         );

        if (result.success) 
        {
          const code = result.data!.partyCode;
          this.parties.push({ partyName, partyCode: code, expenses: [], contributions: [] });
          const resultDTO:Result<PartyCodeDTO> = {success: true, data: {
            partyCode: code,
            partyName: '',
            createdDateTime: ''
          }};
          return resultDTO;
        }
        else{
          return { success: false, data: {partyCode:'', partyName:'', createdDateTime:''} };
        }
      }
      catch (error)
      {
        return { success: false, data: {partyCode:'', partyName:'', createdDateTime:''} };
      }
    }
}

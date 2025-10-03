import { Injectable } from '@angular/core';
import { Contribution } from '../interfaces/IContribution';
import { Expense } from '../interfaces/IExpenses';
import { PartyInfo } from '../interfaces/IPartyInfo';
import { firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';


// Mock data
const mockExpenses: Expense[] = [
  { id: 1, name: 'Dinner at Restaurant', amount: 120, person: 'Alice', tags: ['Food', 'Dinner'] },
  { id: 2, name: 'Uber Ride', amount: 25, person: 'Bob', tags: ['Transport'] },
  { id: 3, name: 'Movie Tickets', amount: 60, person: 'Charlie', tags: ['Entertainment'] }
];

const mockContributions: Contribution[] = [
  { id: 1, person: 'David', amount: 50, tags: ['Food', 'Dinner'] },
  { id: 2, person: 'Eve', amount: 30, tags: ['Transport', 'Entertainment'] }
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

    getPartyInfo(partyCode: string): PartyInfo | null
    {
      console.log(this.parties);
      console.log(partyCode);
      const party = this.parties.find(p => p.partyCode === partyCode);
      console.log(party);
      if (party) {
        return {
          partyName: party.partyName, 
          expenses: party.expenses, 
          contributions: party.contributions,
          partyCode: party.partyCode
        };
      }
      else
      {
        return null;
      }
    }

    async createPartyCode(partyName: string): Promise<string> 
    {
      const result = await firstValueFrom(
        this.api.generatePartyCode({ partyName })
        );

      if (result.success) 
      {
        const code = result.data!.partyCode;
        this.parties.push({ partyName, partyCode: code, expenses: [], contributions: [] });
        return code;
      } 
      else 
      {
        throw new Error(result.errors?.join(', ') ?? 'Failed to generate code');
      }
    }
}

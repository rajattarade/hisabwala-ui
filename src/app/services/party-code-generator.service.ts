import { Injectable } from '@angular/core';
import { Contribution } from '../interfaces/IContribution';
import { Expense } from '../interfaces/IExpenses';
import { PartyInfo } from '../interfaces/IPartyInfo';


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

  constructor() { }

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

    createPartyCode(partyName: string): string {
      const prefix = partyName.trim().toUpperCase().replace(/\s+/g, '').slice(0, 4);
      const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit
      const partyCode = `${prefix}-${randomNum}`;
      this.parties.push({partyName: partyName, partyCode: partyCode, expenses: [], contributions: []});
      console.log(this.parties);
      return partyCode;
    }
}

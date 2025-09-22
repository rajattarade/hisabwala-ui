import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PartyCodeGeneratorService {

  constructor() { }

   createPartyCode(partyName: string): string {
    // Example logic: uppercase + random 4-digit number
    const prefix = partyName.trim().toUpperCase().replace(/\s+/g, '').slice(0, 4);
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit
    return `${prefix}-${randomNum}`;
  }
}

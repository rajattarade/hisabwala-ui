export interface PartyCodeDTO {
  partyName: string;
  partyCode: string;
  createdDateTime: string; // Use string because JSON serializes DateTime as ISO string
}
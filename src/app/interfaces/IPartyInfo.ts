import { Contribution } from "./IContribution";
import { Expense } from "./IExpenses";

interface PartyInfo{
    partyName: string;
    partyCode: string;
    expenses: Expense[];
    contributions: Contribution[];
}

export { PartyInfo };
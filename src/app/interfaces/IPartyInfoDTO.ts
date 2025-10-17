import { Contribution } from "./IContribution";
import { Expense } from "./IExpenses";

interface PartyInfoDTO{
    partyName: string;
    partyCode: string;
    createdDateTime: string;
    expenses: Expense[];
    contributions: Contribution[];
}

export { PartyInfoDTO };
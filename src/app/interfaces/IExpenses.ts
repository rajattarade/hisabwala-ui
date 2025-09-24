interface Expense {
  id: number;
  name: string;
  amount: number;
  person: string;
  tags: string[];
}

export { Expense };
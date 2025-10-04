import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Expense } from '../../interfaces/IExpenses';
import { Contribution } from '../../interfaces/IContribution';
import { PartyCodeGeneratorService } from '../../services/party-code-generator.service';
import { ActivatedRoute } from '@angular/router';
import { PartyInfo } from '../../interfaces/IPartyInfo';

@Component({
    selector: 'app-party-home',
    imports: [FormsModule, CommonModule],
    templateUrl: './party-home.component.html',
    styleUrl: './party-home.component.css'
})

export class PartyHomeComponent implements OnInit {
  constructor(private partyService: PartyCodeGeneratorService,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    this.allTags.set(this.partyService.getTags());
    const partyCode = this.route.snapshot.paramMap.get('partyCode') ?? '';
    const partyInfo: PartyInfo | null = this.partyService.getPartyInfo(partyCode);
    console.log(partyInfo);
    if (partyInfo) {
      this.partyCode.set(partyInfo.partyCode);
      this.partyName.set(partyInfo.partyName);
      this.expenses.set(partyInfo.expenses);
      this.contributions.set(partyInfo.contributions);
    }
  }

  partyCode = signal('');
  partyName = signal('');
  activeTab = signal<'expenses' | 'contributions'>('expenses');
  expenses = signal<Expense[]>([]);
  contributions = signal<Contribution[]>([]);
  allTags = signal<string[]>([]);
  
  isAddingExpense = signal(false);
  isAddingContribution = signal(false);
  
  newExpense = {
    name: '',
    amount: null as number | null,
    person: '',
    tags: [] as string[]
  };
  
  newContribution = {
    person: '',
    amount: null as number | null,
    tags: [] as string[]
  };

  setActiveTab(tab: 'expenses' | 'contributions') {
    this.activeTab.set(tab);
    this.isAddingExpense.set(false);
    this.isAddingContribution.set(false);
  }

  startAddingExpense() {
    this.activeTab.set('expenses');
    this.isAddingExpense.set(true);
    this.resetNewExpense();
  }

  startAddingContribution() {
    this.activeTab.set('contributions');
    this.isAddingContribution.set(true);
    this.resetNewContribution();
  }

  resetNewExpense() {
    this.newExpense = {
      name: '',
      amount: null,
      person: '',
      tags: []
    };
  }

  resetNewContribution() {
    this.newContribution = {
      person: '',
      amount: null,
      tags: [...this.allTags().values()]
    };
  }

  addTagToExpense(tag: string) {
    if (!this.newExpense.tags.includes(tag)) {
      this.newExpense.tags.push(tag);
    }
  }

  removeTagFromExpense(tag: string) {
    this.newExpense.tags = this.newExpense.tags.filter(t => t !== tag);
  }

  removeTagFromContribution(tag: string) {
    this.newContribution.tags = this.newContribution.tags.filter(t => t !== tag);
  }

  availableTagsForExpense(): string[] {
    return this.allTags().filter(tag => !this.newExpense.tags.includes(tag));
  }

  saveExpense() {
    if (this.newExpense.name && this.newExpense.amount && this.newExpense.person) {
      const newId = Math.max(...this.expenses().map(e => e.id)) + 1;
      const expense: Expense = {
        id: newId,
        name: this.newExpense.name,
        amount: this.newExpense.amount,
        person: this.newExpense.person,
        tags: [...this.newExpense.tags]
      };
      this.expenses.set([...this.expenses(), expense]);
      this.cancelAddExpense();
    }
  }

  saveContribution() {
    if (this.newContribution.person && this.newContribution.amount) {
      const newId = Math.max(...this.contributions().map(c => c.id)) + 1;
      const contribution: Contribution = {
        id: newId,
        person: this.newContribution.person,
        amount: this.newContribution.amount,
        tags: [...this.newContribution.tags]
      };
      this.contributions.set([...this.contributions(), contribution]);
      this.cancelAddContribution();
    }
  }

  cancelAddExpense() {
    this.isAddingExpense.set(false);
    this.resetNewExpense();
  }

  cancelAddContribution() {
    this.isAddingContribution.set(false);
    this.resetNewContribution();
  }

  removeTagFromExistingExpense(expenseId: number, tag: string) {
    const updatedExpenses = this.expenses().map(expense => {
      if (expense.id === expenseId) {
        return {
          ...expense,
          tags: expense.tags.filter(t => t !== tag)
        };
      }
      return expense;
    });
    this.expenses.set(updatedExpenses);
  }

  removeTagFromExistingContribution(contributionId: number, tag: string) {
    const updatedContributions = this.contributions().map(contribution => {
      if (contribution.id === contributionId) {
        return {
          ...contribution,
          tags: contribution.tags.filter(t => t !== tag)
        };
      }
      return contribution;
    });
    this.contributions.set(updatedContributions);
  }
}

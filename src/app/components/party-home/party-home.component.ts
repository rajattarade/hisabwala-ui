import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Expense } from '../../interfaces/IExpenses';
import { Contribution } from '../../interfaces/IContribution';
import { PartyCodeGeneratorService } from '../../services/party-code-generator.service';
import { ActivatedRoute } from '@angular/router';
import { PartyInfoDTO } from '../../interfaces/IPartyInfoDTO';

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
  
  async ngOnInit(): Promise<void> {
    this.allTags.set(this.partyService.getTags());
    const partyCode = this.route.snapshot.paramMap.get('partyCode') ?? '';
    const result = await this.partyService.getPartyInfo(partyCode);
    const partyInfo: PartyInfoDTO = result.data!;

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
  
  newExpense: Expense = {
    id: 0,
    name: '',
    amount: 0,
    paidBy: '',
    tag: ''
  };
  
  newContribution:Contribution = {
    id: 0,
    name: '',
    amount: 0,
    tags: [] as string[],
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
      id: 0,
      name: '',
      amount: 0,
      paidBy: '',
      tag: ''
    };
  }

  resetNewContribution() {
    this.newContribution = {
      id: 0,
      name: '',
      amount: 0,
      tags: [...this.allTags().values()]
    };
  }

  addTagToExpense(tag: string) {
      this.newExpense.tag = tag;
      console.log(this.newExpense.tag);
  }

  removeTagFromExpense(tag: string) {
    this.newExpense.tag = '';
  }

  removeTagFromContribution(tag: string) {
    this.newContribution.tags = this.newContribution.tags.filter(t => t !== tag);
  }

  availableTagsForExpense(): string[] {
    return this.allTags().filter(tag => this.newExpense.tag != tag);
  }

  saveExpense() {
    if (this.newExpense.name && this.newExpense.amount && this.newExpense.paidBy) {
      const newId = Math.max(...this.expenses().map(e => e.id)) + 1;
      const expense: Expense = {
        id: newId,
        name: this.newExpense.name,
        amount: this.newExpense.amount,
        paidBy: this.newExpense.paidBy,
        tag: this.newExpense.tag
      };
      this.expenses.set([...this.expenses(), expense]);
      this.cancelAddExpense();
    }
  }

  saveContribution() {
    if (this.newContribution.name && this.newContribution.amount) {
      const newId = Math.max(...this.contributions().map(c => c.id)) + 1;
      const contribution: Contribution = {
        id: newId,
        name: this.newContribution.name,
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
          tag: ''
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

import { Component, EventEmitter, Output, signal } from '@angular/core';
import { PartyCodeGeneratorService } from '../../services/party-code-generator.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-party',
    imports: [ReactiveFormsModule],
    templateUrl: './create-party.component.html',
    styleUrl: './create-party.component.css'
})
export class CreatePartyComponent {
  @Output() closed = new EventEmitter<void>();

  partyName = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  partyCode = signal<string | null>(null);

  constructor(private partyCodeService: PartyCodeGeneratorService,
              private router: Router) { }

  async createPartyCode() 
  {
    if (this.partyName.valid) {
      this.partyCode.set(await this.partyCodeService.createPartyCode(this.partyName.value));
    }
  }

  closeCreateParty() {
    this.closed.emit();
  }

  copyCode() {
    if (this.partyCode()) {
      navigator.clipboard.writeText(this.partyCode()!);
    }
  }

  enterPartyRoom() {
    if (this.partyCode()) {
      this.router.navigate([`/party/${this.partyCode()}`]);
    }
  }
}
